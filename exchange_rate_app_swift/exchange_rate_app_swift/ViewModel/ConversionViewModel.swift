import Foundation

class ConversionViewModel: ObservableObject {
    @Published var currencyOptions: [CurrencyOption] = []
    @Published var fetchCurrenciesErrorMessage: String? = nil
    @Published var isFetchCurrencyListLoading: Bool = false
    @Published var isConversionLoading: Bool = false
    @Published var isTimeSeriesLoading: Bool = false
    @Published var conversionData: ConversionApiResponse? = nil
    @Published var timeSeriesData: TimeSeriesApiResponse? = nil
    @Published var initialTimeSeriesData: TimeSeriesApiResponse? = nil
    @Published var initialConversionData: ConversionApiResponse? = nil

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
                    
                    Task {
                        
                        let todayDateString = HelperFunctions.dateToString(theDate: Date())
                        
                        //After initially fetching ths currency list, we want to fetch the initial conversion data
                        await self.convertCurrency(fromCurrency: "GBP", toCurrency: "USD", amount: "1", date: todayDateString)
                        self.initialConversionData = self.conversionData
                        
                        
                        //After initially fetching ths currency list, we want to fetch the initial timeseries data for 7 days
                        await self.fetchTimeSeriesData(fromCurrency: "GBP", toCurrency: "USD", conversionDate: todayDateString, timeSeriesLength: 4)
                        self.initialTimeSeriesData = self.timeSeriesData
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

    func convertCurrency(fromCurrency: String, toCurrency: String, amount: String, date: String) async {
        isConversionLoading = true
        
        let amountWithCommas = amount.replacingOccurrences(of: ",", with: "")   
        
        guard let amountNumber = Double(amountWithCommas) else {
            print("Invalid amount format")
            isConversionLoading = false
            return
        }
        let amountString = String(amountNumber)

        let conversionUrl = "\(BaseApi.apiUrl)rates/convert"
        var components = URLComponents(string: conversionUrl)!
        components.queryItems = [
            URLQueryItem(name: "from", value: fromCurrency),
            URLQueryItem(name: "to", value: toCurrency),
            URLQueryItem(name: "amount", value: amountString),
            URLQueryItem(name: "date", value: date)
        ]
        
        guard let url = components.url else {
            print("Failed to construct URL")
            isConversionLoading = false
            return
        }

        print("Request URL: \(url)")

        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                print("Failed to fetch data: HTTP \(String(describing: (response as? HTTPURLResponse)?.statusCode))")
                return
            }

            let decoder = JSONDecoder()
            if let conversionResponse = try? decoder.decode(ConversionApiResponse.self, from: data) {
                DispatchQueue.main.async {
                    self.conversionData = conversionResponse
                    self.isConversionLoading = false
                }
            } else {
                isConversionLoading = false
                print("Failed to parse conversion data")
            }
        } catch {
            isConversionLoading = false
            print("Error fetching conversion: \(error)")
        }
    }
    
    func fetchTimeSeriesData(fromCurrency: String, toCurrency: String, conversionDate: String, timeSeriesLength: Int) async {
        isTimeSeriesLoading = true
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"

        guard let endDate = dateFormatter.date(from: conversionDate) else {
            print(conversionDate)
            print("Invalid conversion date format")
            isTimeSeriesLoading = false
            return
        }

        let startDate = Calendar.current.date(byAdding: .day, value: -timeSeriesLength, to: endDate) ?? endDate

        let startDateString = dateFormatter.string(from: startDate)
        let endDateString = dateFormatter.string(from: endDate)

        
        let timeSeriesUrl = "\(BaseApi.apiUrl)rates/time-series"
        var components = URLComponents(string: timeSeriesUrl)!
        components.queryItems = [
            URLQueryItem(name: "from", value: fromCurrency),
            URLQueryItem(name: "to", value: toCurrency),
            URLQueryItem(name: "startDate", value: String(startDateString)),
            URLQueryItem(name: "endDate", value: String(endDateString))
        ]
        
        guard let url = components.url else {
            print("Failed to construct URL")
            isTimeSeriesLoading = false
            return
        }

        print("Request URL: \(url)")

        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                print("Failed to fetch data: HTTP \(String(describing: (response as? HTTPURLResponse)?.statusCode))")
                isTimeSeriesLoading = false
                return
            }

            let decoder = JSONDecoder()
            if let timeSeriesResponse = try? decoder.decode(TimeSeriesApiResponse.self, from: data) {
                DispatchQueue.main.async {
                    self.timeSeriesData = timeSeriesResponse
                    self.isTimeSeriesLoading = false
                }
            } else {
                isTimeSeriesLoading = false
                print("Failed to parse time series data")
            }
        } catch {
            isTimeSeriesLoading = false
            print("Error fetching time series: \(error)")
        }
    }

}
