//
//  RatesComponent.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import SwiftUI

struct RatesComponent: View {
    @Binding var conversionRate: Double
    @Binding var fromCurrency: String
    @Binding var toCurrency: String
    
    var body: some View {
        VStack(spacing: 20) {
            VStack {
                HStack {
                    Spacer()
                    Text("\(fromCurrency) to \(toCurrency)")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(ColorManager.accentColor) // Accent color for heading
                    Spacer()
                }
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(1..<11) { index in
                        let value = Double(index * 100)
                        HStack {
                            Text("\(String(format: "%.2f", value)) \(fromCurrency)")
                                .font(.system(size: 16, weight: .medium))
                                .foregroundColor(ColorManager.accentColor) // Accent color for currency values
                            Spacer()
                            Text("=")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(ColorManager.accentColor.opacity(0.7)) // Lighter accent color for equal sign
                            Spacer()
                            Text("\(String(format: "%.4f", value * conversionRate)) \(toCurrency)")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(ColorManager.accentColor) // Bold and accent color for converted values
                        }
                        .padding(.vertical, 4)
                        Divider() // Add a divider between each row
                    }
                }
            }
            .padding()
            .background(ColorManager.backgroundColor)
            .cornerRadius(12)
            .shadow(radius: 4)
            
            Spacer()
            
            VStack {
                HStack {
                    Spacer()
                    Text("\(toCurrency) to \(fromCurrency)")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(ColorManager.accentColor) // Accent color for heading
                    Spacer()
                }
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(1..<11) { index in
                        let value = Double(index * 100)
                        HStack {
                            Text("\(String(format: "%.2f", value)) \(toCurrency)")
                                .font(.system(size: 16, weight: .medium))
                                .foregroundColor(ColorManager.accentColor) // Accent color for currency values
                            Spacer()
                            Text("=")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(ColorManager.accentColor.opacity(0.7)) // Lighter accent color for equal sign
                            Spacer()
                            Text("\(String(format: "%.4f", value / conversionRate)) \(fromCurrency)")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(ColorManager.accentColor) // Bold and accent color for converted values
                        }
                        .padding(.vertical, 4)
                        Divider() // Add a divider between each row
                    }
                }
            }
            .padding()
            .background(ColorManager.backgroundColor)
            .cornerRadius(12)
            .shadow(radius: 4)
        }
        .padding()
    }
}

#Preview {
    RatesComponent(
        conversionRate: .constant(0.8450),
        fromCurrency: .constant("USD"),
        toCurrency: .constant("EUR")
    )
}
