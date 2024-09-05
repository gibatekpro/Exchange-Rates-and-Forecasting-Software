//
//  HomePageView.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah
//

import SwiftUI
import Combine
import Charts

struct ConversionView: View {
    @EnvironmentObject var conversionViewModel: ConversionViewModel
    @State private var fromCurrency: String = "GBP"
    @State private var toCurrency: String = "USD"
    @State private var selectedFromCurrency: String = "GBP"
    @State private var selectedToCurrency: String = "USD"
    @State private var amount: String = "1"
    @State private var conversionDate: Date = Date()
    @State private var conversionRate: Double = 1.38
    @State private var result: Double = 0
    @State private var isLoading: Bool = false
    @State private var timeSeriesLength: Int = 7
    
    var body: some View {
        ZStack{
            ColorManager.backgroundColor
                .ignoresSafeArea(.all)
            ScrollView {
                VStack(spacing: 20) {
                    ConversionComponent(
                        fromCurrency: $fromCurrency,
                        toCurrency: $toCurrency,
                        selectedFromCurrency: $selectedFromCurrency,
                        selectedToCurrency: $selectedToCurrency,
                        amount: $amount,
                        conversionDate: $conversionDate,
                        result: $result,
                        conversionRate: $conversionRate,
                        isLoading: $isLoading,
                        convertAction: convertCurrency
                    )
                    .environmentObject(conversionViewModel)
                    
                    
                    TimeSeriesComponent()
                        .environmentObject(conversionViewModel)
                    
                    RatesComponent(conversionRate: $conversionRate, fromCurrency: $fromCurrency, toCurrency: $toCurrency)
                }
                .padding()
            }
        }
    }
    
    private func convertCurrency() {
        isLoading = true
        Task {
            //Covert to Date
            let dateString = HelperFunctions.dateToString(theDate: conversionDate)
            
            await conversionViewModel.convertCurrency(fromCurrency:selectedFromCurrency, toCurrency:selectedToCurrency, amount:amount, date:dateString)
            
            if conversionViewModel.conversionData != nil {
                conversionRate = conversionViewModel.conversionData!.info.rate
                result = conversionViewModel.conversionData!.result
                fromCurrency = conversionViewModel.conversionData!.query.from
                toCurrency = conversionViewModel.conversionData!.query.to
            }
            
            await conversionViewModel.fetchTimeSeriesData(fromCurrency: selectedFromCurrency, toCurrency: selectedToCurrency, conversionDate: dateString, timeSeriesLength: 4)
            
            isLoading = false
        }
        
    }
    
}

struct HomePageView_Previews: PreviewProvider {
    static var previews: some View {
        ConversionView()
            .environmentObject(ConversionViewModel())
    }
}

