//
//  CurrencyOption.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/12/24.
//

import Foundation

struct CurrencyOption: Hashable, Identifiable {
    let id = UUID()
    let label: String
    let value: String
}
