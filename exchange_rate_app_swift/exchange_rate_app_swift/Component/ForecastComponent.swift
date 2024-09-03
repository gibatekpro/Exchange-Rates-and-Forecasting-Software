//
//  ForecastComponent.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import SwiftUI

struct ForecastComponent: View {
    @EnvironmentObject var forecastViewModel: ForecastViewModel
    @Binding var baseCurrency: String
    @Binding var forecastCurrency: String
    @Binding var selectedBaseurrency: String
    @Binding var selectedForecastCurrency: String
    @Binding var selectedMethod: Method
    @Binding var conversionDate: Date
    @Binding var isLoading: Bool
    @State private var baseCurrencyOption: CurrencyOption?
    @State private var forecastCurrencyOption: CurrencyOption?
    var forecastAction: () -> Void

    var body: some View {
        ZStack {
            ColorManager.backgroundColor
            if forecastViewModel.isFetchCurrencyListLoading {
                Spinner()
            }else {
                VStack{
                    VStack {
                        Spacer(minLength: 20)
                        VStack(alignment: .leading) {
                            Text("Base Currency")
                                .foregroundColor(ColorManager.accentColor)
                            
                            Picker(selection: $baseCurrencyOption, label: Text("")) {
                                ForEach(forecastViewModel.sortedCurrencyOptions) { option in
                                    Text(option.label)
                                        .tag(option as CurrencyOption?)
                                }
                            }
                            .accentColor(.black.opacity(0.7))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(RoundedRectangle(cornerRadius: 5)
                                .stroke(Color.gray, lineWidth: 1))
                            .pickerStyle(MenuPickerStyle())
                            .onChange(of: baseCurrencyOption) { oldState, newState in
                                selectedBaseurrency = newState!.value
                            }
                            .onAppear{
                                if baseCurrencyOption == nil {
                                    baseCurrencyOption = forecastViewModel.currencyOptions.first(where: { $0.value == "USD" })
                                }
                            }
                        }
                        .frame(maxWidth: .infinity)
                        Spacer(minLength: 30)
                        Button(action: {
                            let selectionHolder = baseCurrencyOption
                            baseCurrencyOption = forecastCurrencyOption
                            forecastCurrencyOption = selectionHolder
                        }) {
                            Image(systemName: "arrow.up.arrow.down.circle").resizable().frame(width: 40, height: 40).foregroundColor(ColorManager.accentColor)
                        }
                        Spacer(minLength: 30)
                        VStack(alignment: .leading) {
                            Text("Forecast Currency")
                                .foregroundColor(ColorManager.accentColor)
                            
                            Picker(selection: $forecastCurrencyOption, label: Text("")) {
                                ForEach(forecastViewModel.sortedCurrencyOptions) { option in
                                    Text(option.label).tag(option as CurrencyOption?)
                                }
                            }
                            .accentColor(.black.opacity(0.7))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(RoundedRectangle(cornerRadius: 5)
                                .stroke(Color.gray, lineWidth: 1))
                            .pickerStyle(MenuPickerStyle())
                            .onChange(of: forecastCurrencyOption) { oldState, newState in
                                selectedForecastCurrency = newState!.value
                            }
                            .onAppear{
                                if forecastCurrencyOption == nil {
                                    forecastCurrencyOption = forecastViewModel.currencyOptions.first(where: { $0.value == "GBP" })
                                }
                            }
                        }
                        .frame(maxWidth: .infinity)
                    }
                    Spacer(minLength: 20)
                    DatePicker("Date", selection: $conversionDate, displayedComponents: .date)
                        .datePickerStyle(CompactDatePickerStyle())
                        .foregroundColor(ColorManager.accentColor)
                    Spacer(minLength: 20)
                    VStack(alignment: .leading) {
                        Text("Forecast Method")
                            .foregroundColor(ColorManager.accentColor)
                        
                        Picker(selection: $selectedMethod, label: Text("")) {
                            ForEach(Method.allCases) { method in
                                Text(method.rawValue).tag(method)
                            }
                        }
                        .accentColor(.black.opacity(0.7))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(RoundedRectangle(cornerRadius: 5)
                            .stroke(Color.gray, lineWidth: 1))
                        .pickerStyle(MenuPickerStyle())
                        .onChange(of: selectedMethod) { oldState, newState in
                        }
                    }
                    .frame(maxWidth: .infinity)
                    Button(action: forecastAction) {
                        if isLoading {
                            ProgressView()
                        } else {
                            Text("Forecast")
                                .fontWeight(.bold)
                                .frame(maxWidth: .infinity)
                        }
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(isLoading)
                    .padding(.top, 10)
                    
                    
                }
                .padding()
                .background(Color.white)
                .cornerRadius(12)
                .shadow(radius: 4)
            }
        }
    }
    
}

#Preview {
    ForecastComponent(
        baseCurrency: .constant("USD"),
        forecastCurrency: .constant("GBP"),
        selectedBaseurrency: .constant("USD"),
        selectedForecastCurrency: .constant("GBP"),
        selectedMethod: .constant(.sma),
        conversionDate: .constant(Date()),
        isLoading: .constant(false),
        forecastAction: {}
    ).environmentObject(ForecastViewModel())
}
