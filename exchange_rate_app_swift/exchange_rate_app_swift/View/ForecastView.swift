//
//  ForecastView.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import SwiftUI

struct ForecastView: View {
    @EnvironmentObject var forecastViewModel: ForecastViewModel
    @State private var baseCurrency: String = "USD"
    @State private var forecastCurrency: String = "GBP"
    @State private var selectedBaseCurrency: String = "USD"
    @State private var selectedForecastCurrency: String = "GBP"
    @State private var selectedMethod: Method = .sma
    @State private var conversionDate: Date = Date()
    @State private var isLoading: Bool = false
    var body: some View {
        ZStack{
            ColorManager.backgroundColor
                .ignoresSafeArea(.all)
            ScrollView {
                VStack(spacing: 20) {
                    ForecastComponent(
                        baseCurrency: $baseCurrency,
                        forecastCurrency: $forecastCurrency,
                        selectedBaseurrency: $selectedBaseCurrency,
                        selectedForecastCurrency: $selectedForecastCurrency,
                        selectedMethod: $selectedMethod,
                        conversionDate: $conversionDate,
                        isLoading: $isLoading,
                        forecastAction: forecastAction
                    )
                    .environmentObject(forecastViewModel)
                    
                }
                .padding()
            }.padding()
        }
    }
    
    private func forecastAction() {
        isLoading = true
        Task {
            //Covert to Date
            _ = HelperFunctions.dateToString(theDate: conversionDate)
            
            isLoading = false
        }
        
    }
    
}

#Preview {
    ForecastView()
        .environmentObject(ForecastViewModel())
}
