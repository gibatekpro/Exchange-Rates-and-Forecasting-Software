//
//  TimeSeriesComponent.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import SwiftUI
import Charts

struct TimeSeriesComponent: View {
    @EnvironmentObject var conversionViewModel: ConversionViewModel
    
    var body: some View {
        VStack {
            Text("Time Series Chart")
                .font(.headline)
                .foregroundColor(.black)
            
            if let timeSeriesData = conversionViewModel.timeSeriesData?.dataPoints, !timeSeriesData.isEmpty {
                
                let minYValue = timeSeriesData.map { $0.value }.min() ?? 0
                let maxYValue = timeSeriesData.map { $0.value }.max() ?? 1
                
                Chart(timeSeriesData) { item in
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
    TimeSeriesComponent().environmentObject(ConversionViewModel())
}
