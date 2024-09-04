//
//  ForecastViewModel.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import Foundation

class ForecastViewModel: ObservableObject {
    @Published var currencyOptions: [CurrencyOption] = []
    @Published var fetchCurrenciesErrorMessage: String? = nil
    @Published var isFetchCurrencyListLoading: Bool = false
    @Published var isForecastLoading: Bool = false
    @Published var forecastData: ForecastApiResponse? = nil
    @Published var timeSeriesData: TimeSeriesApiResponse? = nil

    var sortedCurrencyOptions: [CurrencyOption] {
        currencyOptions.sorted { $0.label < $1.label }
    }

    init() {
        Task {
            await fetchCurrencies()
        }
    }
    
    
    func fetchCurrencies() async {
        isFetchCurrencyListLoading = true
        let fetchCurrencyListUrl = "\(BaseApi.apiUrl)rates/currency-list"
        let currencyListUrl = URL(string: fetchCurrencyListUrl)!
        
        print(fetchCurrencyListUrl)
        
        do {
            let (data, response) = try await URLSession.shared.data(from: currencyListUrl)
            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                print("Failed to fetch data: HTTP \(String(describing: (response as? HTTPURLResponse)?.statusCode))")
                DispatchQueue.main.async {
                    self.fetchCurrenciesErrorMessage = "Failed to fetch currencies"
                }
                return
            }
            if let json = try? JSONSerialization.jsonObject(with: data, options: []),
               let response = json as? [String: Any],
               let success = response["success"] as? Bool, success,
               let symbols = response["symbols"] as? [String: String] {
                
                let currencyOptions = symbols.map { (code, name) in
                    CurrencyOption(label: "\(code) - \(name)", value: code)
                }
                DispatchQueue.main.async {
                    self.currencyOptions = currencyOptions
                    self.isFetchCurrencyListLoading = false
                   
                    Task {
                        
                        let tomorrow = Calendar.current.date(byAdding: .day, value: 2, to: Date())!
                        let tomorrowDateString = HelperFunctions.dateToString(theDate: tomorrow)
                        
                        //After initially fetching ths currency list, we want to fetch the initial forecast data
                        await self.fetchForecast(method: "sma", baseCurrency: "USD", forecastCurrency: "GBP", endDate: tomorrowDateString)
                        print()
                        self.isFetchCurrencyListLoading = false
                    
                    }
                }
            } else {
                isFetchCurrencyListLoading = false
                print("Failed to fetch currencies: Invalid response")
            }
        } catch {
            isFetchCurrencyListLoading = false
            print("Error fetching currencies: \(error)")
        }
    }
    
    
    func fetchForecast(method: String, baseCurrency: String, forecastCurrency: String, endDate: String) async {
        isForecastLoading = true
        
        
        let today = Date()
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        let startDate = dateFormatter.string(from: today)
        
        let forecastUrl = "\(BaseApi.apiUrl)forecast/data"
        var components = URLComponents(string: forecastUrl)!
        components.queryItems = [
            URLQueryItem(name: "method", value: method),
            URLQueryItem(name: "baseCurrency", value: baseCurrency),
            URLQueryItem(name: "forecastCurrency", value: forecastCurrency),
            URLQueryItem(name: "startDate", value: startDate),
            URLQueryItem(name: "endDate", value: endDate)
        ]
        
        guard let url = components.url else {
            print("Failed to construct URL")
            isForecastLoading = false
            return
        }

        print("Request URL: \(url)")

        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                print("Failed to fetch forecast data: HTTP \(String(describing: (response as? HTTPURLResponse)?.statusCode))")
                isForecastLoading = false
                return
            }

            let decoder = JSONDecoder()
            if let forecastResponse = try? decoder.decode(ForecastApiResponse.self, from: data) {
                DispatchQueue.main.async {
                    self.forecastData = forecastResponse
                    self.isForecastLoading = false
                    print(self.forecastData!)
                }
            } else {
                isForecastLoading = false
                print("Failed to parse forecast data")
            }
        } catch {
            isForecastLoading = false
            print("Error fetching forecast: \(error)")
        }
    }

}
