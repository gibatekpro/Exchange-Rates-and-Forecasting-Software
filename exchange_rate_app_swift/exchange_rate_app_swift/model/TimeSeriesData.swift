//
//  TimeSeriesData.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import Foundation

struct TimeSeriesData: Identifiable {
    let id = UUID()
    let date: Date
    let value: Double
}
