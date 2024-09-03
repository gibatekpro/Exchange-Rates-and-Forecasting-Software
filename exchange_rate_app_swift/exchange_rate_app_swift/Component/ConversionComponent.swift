//
//  ConversionComponent.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/2/24.
//

import SwiftUI
import Foundation

struct ConversionComponent: View {
    @EnvironmentObject var conversionViewModel: ConversionViewModel
    @Binding var fromCurrency: String
    @Binding var toCurrency: String
    @Binding var selectedFromCurrency: String
    @Binding var selectedToCurrency: String
    @Binding var amount: String
    @Binding var conversionDate: Date
    @Binding var result: Double
    @Binding var conversionRate: Double
    @Binding var isLoading: Bool
    @State private var fromCurrencyOption: CurrencyOption?
    @State private var toCurrencyOption: CurrencyOption?
    @FocusState var isConversionFormFocused: Bool
    var convertAction: () -> Void
    
    var body: some View {
        ZStack {
            ColorManager.backgroundColor
            if conversionViewModel.isFetchCurrencyListLoading {
                Spinner()
            }else {
                VStack{
                    VStack {
                        VStack(alignment: .leading) {
                            Text("Amount")
                                .foregroundColor(ColorManager.accentColor)
                            TextField("Enter amount", text: $amount)
                                .keyboardType(.decimalPad)
                                .multilineTextAlignment(.leading)
                                .background(Color.white)
                                .padding(4)
                                .background(RoundedRectangle(cornerRadius: 5)
                                    .stroke(Color.gray, lineWidth: 1))
                                .foregroundColor(.black.opacity(0.7))
                                .focused($isConversionFormFocused)
                                .onChange(of: amount) { oldState, newState in
                                    HelperFunctions.filterAmountString(newState, $amount)
                                }
                        }
                        Spacer(minLength: 20)
                        VStack(alignment: .leading) {
                            Text("From")
                                .foregroundColor(ColorManager.accentColor)
                            
                            Picker(selection: $fromCurrencyOption, label: Text("")) {
                                ForEach(conversionViewModel.sortedCurrencyOptions) { option in
                                    Text(option.label)
                                        .tag(option as CurrencyOption?)
                                }
                            }
                            .accentColor(.black.opacity(0.7))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(RoundedRectangle(cornerRadius: 5)
                                .stroke(Color.gray, lineWidth: 1))
                            .pickerStyle(MenuPickerStyle())
                            .onChange(of: fromCurrencyOption) { oldState, newState in
                                selectedFromCurrency = newState!.value
                            }
                            .onAppear{
                                if fromCurrencyOption == nil {
                                    fromCurrencyOption = conversionViewModel.currencyOptions.first(where: { $0.value == "GBP" })
                                }
                            }
                        }
                        .frame(maxWidth: .infinity)
                        Spacer(minLength: 30)
                        Button(action: {
                            let selectionHolder = fromCurrencyOption
                            fromCurrencyOption = toCurrencyOption
                            toCurrencyOption = selectionHolder
                        }) {
                            Image(systemName: "arrow.up.arrow.down.circle").resizable().frame(width: 40, height: 40).foregroundColor(ColorManager.accentColor)
                        }
                        Spacer(minLength: 30)
                        VStack(alignment: .leading) {
                            Text("To")
                                .foregroundColor(ColorManager.accentColor)
                            
                            Picker(selection: $toCurrencyOption, label: Text("")) {
                                ForEach(conversionViewModel.sortedCurrencyOptions) { option in
                                    Text(option.label).tag(option as CurrencyOption?)
                                }
                            }
                            .accentColor(.black.opacity(0.7))
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(RoundedRectangle(cornerRadius: 5)
                                .stroke(Color.gray, lineWidth: 1))
                            .pickerStyle(MenuPickerStyle())
                            .onChange(of: toCurrencyOption) { oldState, newState in
                                selectedToCurrency = newState!.value
                            }
                            .onAppear{
                                if toCurrencyOption == nil {
                                    toCurrencyOption = conversionViewModel.currencyOptions.first(where: { $0.value == "USD" })
                                }
                            }
                        }
                        .frame(maxWidth: .infinity)
                    }
                    Spacer(minLength: 20)
                    DatePicker("Date", selection: $conversionDate, displayedComponents: .date)
                        .datePickerStyle(CompactDatePickerStyle())
                        .foregroundColor(ColorManager.accentColor)
                    
                    
                    VStack(alignment: .leading, spacing: 4) {
                        Text("\(amount) \(fromCurrency) =")
                            .onAppear{
                                if conversionViewModel.initialConversionData != nil {
                                    fromCurrency = conversionViewModel.initialConversionData!.query.from
                                }
                            }
                            .foregroundColor(.black)
                        Text("\(String(format: "%.4f", result)) \(toCurrency)")
                            .onAppear{
                                if conversionViewModel.initialConversionData != nil {
                                    result = conversionViewModel.initialConversionData!.result
                                    toCurrency = conversionViewModel.initialConversionData!.query.to
                                }
                            }
                            .foregroundColor(.black)
                            .font(.largeTitle)
                            .fontWeight(.bold)
                        Text("1 \(fromCurrency) = \(String(format: "%.4f", conversionRate)) \(toCurrency)")
                            .onAppear{
                                if conversionViewModel.initialConversionData != nil {
                                    conversionRate = conversionViewModel.initialConversionData!.info.rate
                                    fromCurrency = conversionViewModel.initialConversionData!.query.from
                                    toCurrency = conversionViewModel.initialConversionData!.query.to
                                }
                            }
                            .foregroundColor(.black)
                        Text("1 \(toCurrency) = \(String(format: "%.4f", 1/conversionRate)) \(fromCurrency)")
                            .onAppear{
                                if conversionViewModel.initialConversionData != nil {
                                    conversionRate = conversionViewModel.initialConversionData!.info.rate
                                    fromCurrency = conversionViewModel.initialConversionData!.query.from
                                    toCurrency = conversionViewModel.initialConversionData!.query.to
                                }
                            }
                            .foregroundColor(.black)
                    }
                    .padding(.top, 10)
                    
                    Button(action: convertAction) {
                        if isLoading {
                            ProgressView()
                        } else {
                            Text("Convert")
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

struct ConversionComponent_Previews: PreviewProvider {
    static var previews: some View {
        ConversionComponent(
            fromCurrency: .constant("USD"),
            toCurrency: .constant("EUR"),
            selectedFromCurrency: .constant("USD"),
            selectedToCurrency: .constant("EUR"),
            amount: .constant("100"),
            conversionDate: .constant(Date()),
            result: .constant(84.50),
            conversionRate: .constant(0.8450),
            isLoading: .constant(false),
            convertAction: {}
        ).environmentObject(ConversionViewModel())
    }
}
