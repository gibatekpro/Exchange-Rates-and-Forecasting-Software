//
//  Spinner.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import Foundation

import SwiftUI

struct Spinner: View {
  var body: some View {
      ZStack{
          ColorManager.backgroundColor
          ProgressView()
              .progressViewStyle(CircularProgressViewStyle(tint: ColorManager.accentColor))
                .scaleEffect(2.0, anchor: .center) // Makes the spinner larger
                .onAppear {
                  DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
                    // Simulates a delay in content loading
                    // Perform transition to the next view here
                  }
                }
      }
    
  }
}

#Preview {
    Spinner()
}
