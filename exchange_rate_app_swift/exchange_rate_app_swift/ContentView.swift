//
//  ContentView.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 6/28/24.
//

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @StateObject var conversionViewModel = ConversionViewModel()
    
    var body: some View {
        NavigationView {
            VStack {
                if authViewModel.user != nil {
                    Button(action: authViewModel.logout) {
                        Text("Log Out")
                            .font(Font.system(size: 20, weight: .bold))
                            .foregroundColor(Color.black)
                            .padding(10)
                            .frame(width: UIScreen.main.bounds.width - 53)
                            .background(
                                RoundedRectangle(cornerRadius: 10)
                                    .foregroundColor(Color.white)
                            )
                    }
                }else {
                    NavigationLink(destination: LoginView()) {
                        Text("Log In")
                            .font(Font.system(size: 20, weight: .bold))
                            .foregroundColor(Color.black)
                            .padding(10)
                            .frame(width: UIScreen.main.bounds.width - 53)
                            .background(
                                RoundedRectangle(cornerRadius: 10)
                                    .foregroundColor(Color.white)
                            )
                    }
                }
            }
            .padding()
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(AuthViewModel())
}
