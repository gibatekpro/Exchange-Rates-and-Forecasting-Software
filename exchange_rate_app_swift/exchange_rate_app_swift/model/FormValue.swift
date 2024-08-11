//
//  FormValue.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import Foundation

//Struct for the entire API response
struct ConversionApiResponse: Codable {
    let success: Bool
    let query: Query
    let info: Info
    let date: String
    let historical: Bool
    let result: Double
}

//Struct is for the query information
struct Query: Codable {
    let from: String
    let to: String
    let amount: Double
}

//Struct is for the info section
struct Info: Codable {
    let timestamp: Int
    let rate: Double
}

