//
//  HelperFunctions.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/2/24.
//

import Foundation
import SwiftUI

struct HelperFunctions{
    
    public static func filterAmountString(_ newString: String, _ binding: Binding<String>)
    {
        //Removes all the non-number characters except the decimal point
        var filteredString = newString.replacingOccurrences(of: "[^0-9.]", with: "", options: .regularExpression)
        
        if filteredString.isEmpty || filteredString == "." || Double(filteredString) == 0 {
            binding.wrappedValue = "0"
            return
        }
        
        //Handles multiple decimal points by keeping only the first
        if let firstDecimalIndex = filteredString.firstIndex(of: ".") {
            let integerPart = filteredString[..<firstDecimalIndex]
            let decimalPart = filteredString[firstDecimalIndex...].replacingOccurrences(of: ".", with: "")
            filteredString = "\(integerPart).\(decimalPart)"
        }
        
        var parts = filteredString.split(separator: ".").map { String($0) }
        
        parts[0] = String(Int(parts[0]) ?? 0)
        
        if let integerPart = Int(parts[0]) {
            let numberFormatter = NumberFormatter()
            numberFormatter.numberStyle = .decimal
            parts[0] = numberFormatter.string(from: NSNumber(value: integerPart)) ?? parts[0]
        }
        
        filteredString = parts.joined(separator: ".")
        binding.wrappedValue = filteredString
    }
    
       
    public static func dateToString(theDate: Date) -> String
    {
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        let dateString = dateFormatter.string(from: theDate)
        
        return dateString
    }
    
    
}
