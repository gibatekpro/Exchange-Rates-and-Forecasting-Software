//
//  TimeSeriesApiResponse.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import Foundation

//Struct is for the entire Time Series API response
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

