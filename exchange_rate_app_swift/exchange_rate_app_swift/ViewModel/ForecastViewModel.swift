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
    @Published var conversionData: ConversionApiResponse? = nil
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
                   
//                    Task {
//                        
//                        let todayDateString = HelperFunctions.dateToString(theDate: Date())
//                        
//                        //After initially fetching ths currency list, we want to fetch the initial conversion data
//                        await self.convertCurrency(fromCurrency: "GBP", toCurrency: "USD", amount: "1", date: todayDateString)
//                        self.initialConversionData = self.conversionData
//                        
//                        
//                        //After initially fetching ths currency list, we want to fetch the initial timeseries data for 7 days
//                        await self.fetchTimeSeriesData(fromCurrency: "GBP", toCurrency: "USD", conversionDate: todayDateString, timeSeriesLength: 4)
//                        self.initialTimeSeriesData = self.timeSeriesData
//                        self.isFetchCurrencyListLoading = false
//                    
//                    }
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

}
