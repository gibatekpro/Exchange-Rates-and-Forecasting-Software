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
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var selectedNavTab: NavTab = .conversion
    
    var body: some View {
        NavigationView {
            ZStack {
                ColorManager.backgroundColor
                TabView(selection: $selectedNavTab) {
                    ConversionView()
                        .environmentObject(conversionViewModel)
                        .tag(NavTab.conversion)
                    ForecastView()
                        .environmentObject(forecastViewModel)
                        .tag(NavTab.forecast)
                }
                .background(ColorManager.backgroundColor)
                .padding(EdgeInsets(top: 80, leading: 0, bottom: 0, trailing: 0))
                
                VStack {
                    HStack {
                        Text("Exchange R")
                            .font(.headline)
                            .foregroundColor(.white)
                        
                        Spacer()
                        if authViewModel.user != nil {
                            Button(action: {
                                authViewModel.logout()
                            }) {
                                VStack {
                                    Image(systemName: "person")
                                        .resizable()
                                        .frame(width: 24, height: 24)
                                        .foregroundColor(.white)
                                    Text("logout")
                                        .font(.caption)
                                        .foregroundColor(.white)
                                }
                            }
                        } else {
                            NavigationLink(destination: LoginView()) {
                                VStack {
                                    Image(systemName: "person")
                                        .resizable()
                                        .frame(width: 24, height: 24)
                                        .foregroundColor(.white)
                                    Text("Login")
                                        .font(.caption)
                                        .foregroundColor(.white)
                                }
                            }
                        }
                    }
                    .padding()
                    .background(Color.blue)
                    
                    Spacer()
                }
                .edgesIgnoringSafeArea(.bottom)
                
                VStack {
                    Spacer()
                    BottomNav(selectedNavTab: $selectedNavTab)
                }
                .edgesIgnoringSafeArea(.bottom)
            }
        }
    }
}
#Preview {
    MainView()
        .environmentObject(AuthViewModel())
}

