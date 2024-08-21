//
//  BaseApi.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//



import Foundation

struct BaseApi {
    static let baseUrlDev: String = "http://localhost:3031"
    static let baseUrlProd: String = "https://gibatekpro.com"
    static let apiUrl: String = baseUrlProd + "/api/v1/"
}

