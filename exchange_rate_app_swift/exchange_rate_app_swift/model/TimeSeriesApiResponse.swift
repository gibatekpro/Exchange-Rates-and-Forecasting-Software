//
//  TimeSeriesApiResponse.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import Foundation

struct TimeSeriesApiResponse: Codable {
    let success: Bool
    let timeseries: Bool
    let startDate: String
    let endDate: String
    let base: String
    let to: String
    let rates: [String: [String: Double]]
    
    enum CodingKeys: String, CodingKey {
        case success, timeseries, base, to, rates
        case startDate = "start_date"
        case endDate = "end_date"
    }
}

extension TimeSeriesApiResponse {
    var dataPoints: [TimeSeriesData] {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"

        return rates.compactMap { dateString, rateDict in
            guard let date = dateFormatter.date(from: dateString),
                  let value = rateDict[to] else {
                return nil
            }
            return TimeSeriesData(date: date, value: value)
        }.sorted { $0.date < $1.date }
    }
}

