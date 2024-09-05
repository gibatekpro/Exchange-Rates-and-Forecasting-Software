//
//  CurrencyForecast.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/4/24.
//

import Foundation

struct CurrencyForecast: Codable {
    let id: Int
    let baseCurrency: Currency
    let forecastCurrency: Currency
    let conversionDate: String
    let forecastDate: String
    let actualRate: Double
    let smaRate: Double
    let lsmRate: Double
    let emaRate: Double
}


struct Currency: Codable {
    let id: Int
    let currencyCode: String
    let currencyName: String
}
