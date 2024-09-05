//
//  ForecastComparison.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/4/24.
//

import Foundation

struct ForecastComparison {
    var baseCurrency: String
    var forecastCurrency: String
    var smaRate: Double
    var emaRate: Double
    var lsmRate: Double
    var actualRate: Double
}
