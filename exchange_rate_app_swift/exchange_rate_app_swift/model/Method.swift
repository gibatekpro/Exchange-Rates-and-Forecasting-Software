//
//  Method.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import Foundation

enum Method: String, CaseIterable, Identifiable {
    case sma = "Simple Moving Average"
    case ema = "Exponential Moving Average"
    case lsm = "Least Square Method"
    
    var id: String { self.rawValue }
}

extension Method {
    var shortValue: String {
        switch self {
        case .sma:
            return "sma"
        case .ema:
            return "ema"
        case .lsm:
            return "lsm"
        }
    }
}
