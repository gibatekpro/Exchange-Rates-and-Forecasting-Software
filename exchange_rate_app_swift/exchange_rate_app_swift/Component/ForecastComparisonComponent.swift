//
//  ForecastComparisonComponent.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/4/24.
//

import SwiftUI

struct ForecastComparisonComponent: View {
    @EnvironmentObject var forecastViewModel: ForecastViewModel
    
    var body: some View {
        VStack {
            if forecastViewModel.isFetchForecastComparisonLoading {
                Spinner()
            } else if let errorMessage = forecastViewModel.fetchForecastComparisonErrorMessage {
                Text(errorMessage)
                    .foregroundColor(.red)
            }  else if !forecastViewModel.forecastComparisonData.isEmpty {
                ForEach(forecastViewModel.forecastComparisonData, id: \.forecastCurrency) { item in
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Base Currency: \(item.baseCurrency)")
                            .font(.headline)
                            .foregroundColor(.blue)
                        Text("Forecast Currency: \(item.forecastCurrency)")
                            .foregroundColor(.blue)
                        Text("SMA Rate: \(item.smaRate)")
                            .foregroundColor(.black.opacity(0.7))
                        Text("EMA Rate: \(item.emaRate)")
                            .foregroundColor(.black.opacity(0.7))
                        Text("LSM Rate: \(item.lsmRate)")
                            .foregroundColor(.black.opacity(0.7))
                        Text("Actual Rate: \(item.actualRate)")
                            .foregroundColor(.black)
                            .fontWeight(.bold)
                    }
                    .padding()
                    .background(Color.white)
                    .cornerRadius(8)
                    .shadow(radius: 3)
                    .padding(.bottom, 10)
                }
            } else {
                Text("No data available")
            }
        }
    }
}

#Preview {
    ForecastComparisonComponent()
        .environmentObject(ForecastViewModel())
}
