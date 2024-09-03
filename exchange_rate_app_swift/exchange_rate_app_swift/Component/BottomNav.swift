//
//  BottomNav.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 9/3/24.
//


import SwiftUI

enum NavTab: String, CaseIterable {
    case conversion = "sterlingsign.arrow.circlepath"
    case forecast = "chart.line.uptrend.xyaxis"
    
    var label: String {
            switch self {
            case .conversion:
                return "Conversion"
            case .forecast:
                return "Forecast"
            }
        }
}

struct BottomNav: View {
    @Binding var selectedNavTab: NavTab
    private var image: String{ selectedNavTab.rawValue
    }
    var body: some View {
        VStack{
            ZStack{
                RoundedRectangle(cornerRadius: 0)
                    .fill(ColorManager.tertiaryAccentColor)
                    .frame(height: 82)
                    .offset(x: 0, y: -1.0)
                RoundedRectangle(cornerRadius: 0)
                    .fill(ColorManager.backgroundColor)
                    .frame(height: 84)
                    .offset(x: 0, y: 2.0)
                HStack{
                    ForEach(NavTab.allCases, id: \.rawValue){
                        navTab in
                        Spacer()
                        VStack{
                            Image(systemName: navTab.rawValue )
                                .scaleEffect(navTab == selectedNavTab ? 1.3 : 1.15)
                                .foregroundColor(navTab == selectedNavTab ? .tertiaryAccentColor : .tertiaryAccentColor.opacity(0.5))
                                .font(.system(size: 18))
                                .onTapGesture{
                                    withAnimation(.easeIn(duration: 0.1)){
                                        selectedNavTab = navTab
                                    }
                                }
                            Text(navTab.label)
                                                    .font(.caption)
                                                    .foregroundColor(navTab == selectedNavTab ? .tertiaryAccentColor : .tertiaryAccentColor.opacity(0.5))
                                                    .padding(EdgeInsets(top: 5, leading: 0, bottom: 0, trailing: 0))
                                                    .onTapGesture{
                                                        withAnimation(.easeIn(duration: 0.1)){
                                                            selectedNavTab = navTab
                                                        }
                                                    }
                        }
                        Spacer()
                    }
                Spacer(minLength: 10)
                }
                .frame(width: nil, height: 80)
                .background(ColorManager.backgroundColor)
                .cornerRadius(0)
                .padding(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
            
            }
        }
    }
}

#Preview {
    BottomNav(selectedNavTab: .constant(.conversion))
}
