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
                    Chart {
                        ForEach(forecastData) { item in
                            BarMark(
                                x: .value("Date", HelperFunctions.dateToString(theDate: item.date)),
                                y: .value("Value", item.value)
                            ).annotation(position: .top) {
                                Text("\(item.value, specifier: "%.6f")")
                                    .foregroundColor(.blue)
                                    .font(.caption)
                            }
                        }
                    }
                    .chartScrollableAxes(.horizontal)
                    .chartXVisibleDomain(length: 4)
                    .frame(height: 400)
                    .background(ColorManager.backgroundColor)
                    .chartXAxis {
                        AxisMarks(values: forecastData.map { HelperFunctions.dateToString(theDate: $0.date) }) { value in
                            AxisGridLine().foregroundStyle(Color.black.opacity(0.5))
                            AxisValueLabel() {
                                Text(value.as(String.self) ?? "")
                                    .foregroundColor(.black)
                            }
                        }
                    }
                    .chartYAxis {
                        AxisMarks() { value in
                            AxisGridLine().foregroundStyle(Color.black.opacity(0.5))
                            AxisValueLabel() {
                                Text("\(value.as(Double.self) ?? 0.0, specifier: "%.2f")")
                                    .foregroundColor(.black)
                            }
                        }
                    }
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
