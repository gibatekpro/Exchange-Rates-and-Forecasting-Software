//
//  ConversionViewModel.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/12/24.
//

import Foundation

class ConversionViewModel: ObservableObject{
    @Published var currencyOptions: [CurrencyOption] = []
    @Published var fetchCurrenciesErrorMessage: String? = nil
    
    init() {
        Task {
            await fetchCurrencies()
        }
    }
        
        func fetchCurrencies() async {
            let fetchCurrencyListUrl = "\(BaseApi.apiUrl)rates/currency-list"
            let currencyListUrl = URL(string: fetchCurrencyListUrl)!
            
            print(fetchCurrencyListUrl)
            
            do {
                let (data, response) = try await URLSession.shared.data(from: currencyListUrl)
                guard let httpResponse = response as? HTTPURLResponse,
                      httpResponse.statusCode == 200 else{
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
                        print(currencyOptions)
                    }
                } else {
                    print("Failed to fetch currencies: Invalid response")
                }
            } catch {
                print("Error fetching currencies: \(error)")
            }
        }
    
    
}
