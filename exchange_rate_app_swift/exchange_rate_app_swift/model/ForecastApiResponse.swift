//
//  ForecastApiResponse.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import Foundation

struct ForecastApiResponse: Codable {
    let success: Bool
    let baseCurrency: String
    let forecastCurrency: String
    let rates: [String: [String: Double]]
    let timeseries: Bool
    let startDate: String
    let endDate: String
    
    enum CodingKeys: String, CodingKey {
        case success
        case baseCurrency = "baseCurrency"
        case forecastCurrency = "forecastCurrency"
        case rates
        case timeseries
        case startDate = "start_date"
        case endDate = "end_date"
    }
}

extension ForecastApiResponse {
    var dataPoints: [ForecastData] {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        
        return rates.compactMap { dateString, rateDict in
            guard let date = dateFormatter.date(from: dateString),
                  let value = rateDict[forecastCurrency] else {
                return nil
            }
            return ForecastData(date: date, value: value)
        }.sorted { $0.date < $1.date }
    }
}
