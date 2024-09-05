//
//  ForecastComparisonApiResponse.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/4/24.
//

import Foundation

struct ForecastComparisonApiResponse: Codable {
    let success: Bool
    let forecastComparisons: [ForecastItem]
}


struct ForecastItem: Codable {
    let conversionRate: Double
    let forecastData: CurrencyForecast
}

func decodeForecastComparisonData(from jsonData: Data) -> ForecastComparisonApiResponse? {
    let decoder = JSONDecoder()
    decoder.dateDecodingStrategy = .iso8601 // Adjust if needed
    do {
        let forecastData = try decoder.decode(ForecastComparisonApiResponse.self, from: jsonData)
        return forecastData
    } catch {
        print("Failed to decode JSON: \(error)")
        return nil
    }
}
