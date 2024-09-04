//
//  ForecastChartComponent.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import SwiftUI
import Charts

struct ForecastChartComponent: View {
    @EnvironmentObject var forecastViewModel: ForecastViewModel
    
    var body: some View {
        VStack {
            Text("Forecast Chart")
                .font(.headline)
                .foregroundColor(.black)
            
            if let forecastData = forecastViewModel.forecastData?.dataPoints, !forecastData.isEmpty {
                
                let minYValue = forecastData.map { $0.value }.min() ?? 0
                let maxYValue = forecastData.map { $0.value }.max() ?? 1
                
                Chart(forecastData) { item in
                    LineMark(
                        x: .value("Date", item.date),
                        y: .value("Value", item.value)
                    )
                }
                .chartYScale(domain: minYValue...maxYValue)
                .chartXAxis {
                    AxisMarks(values: .stride(by: .day, count: 1)) { _ in
                        AxisGridLine()
                        AxisValueLabel(format: .dateTime.month().day())
                            .foregroundStyle(.black)
                    }
                }
                .chartYAxis {
                    AxisMarks(values: .automatic) { _ in
                        AxisGridLine()
                        AxisValueLabel()
                            .foregroundStyle(.black)
                    }
                }
                .frame(height: 200)
                .padding()
                .background(ColorManager.backgroundColor)
                .cornerRadius(12)
                .shadow(radius: 4)
            } else {
                Spinner()
            }
        }
        .padding()
    }
}

#Preview {
    ForecastChartComponent().environmentObject(ForecastViewModel())
}
