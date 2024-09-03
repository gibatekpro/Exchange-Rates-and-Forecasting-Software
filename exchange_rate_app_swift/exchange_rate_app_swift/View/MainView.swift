//
//  MainView.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//

import SwiftUI

struct MainView: View {
    @StateObject var conversionViewModel = ConversionViewModel()
    @StateObject var forecastViewModel = ForecastViewModel()
    @State private var selectedNavTab: NavTab = .conversion
    
    var body: some View {
        ZStack {
            ColorManager.backgroundColor
                    TabView(selection: $selectedNavTab) {
                        ConversionView()
                            .environmentObject(conversionViewModel)
                            .tag(NavTab.conversion)
                        ForecastView()
                            .environmentObject(forecastViewModel)
                            .tag(NavTab.forecast)
                    }.background(ColorManager.backgroundColor)
                    
                    VStack {
                        Spacer()
                        BottomNav(selectedNavTab: $selectedNavTab)
                    }
                    .edgesIgnoringSafeArea(.bottom)
                }
    }
}

#Preview {
    MainView()
}
