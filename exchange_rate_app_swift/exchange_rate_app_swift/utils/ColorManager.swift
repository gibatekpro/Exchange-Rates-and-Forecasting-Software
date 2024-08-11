
import SwiftUI

struct ColorManager {
    // create static variables for custom colors
    static let backgroundColor = Color("BackgroundColor")
    static let accentColor = Color("AccentColor")
    static let secondaryAccentColor = Color("SecondaryAccentColor")
    static let tertiaryAccentColor = Color("TertiaryAccentColor")
    static let ratingsColor = Color("RatingsColor")

}

// Or we can use an extension
//this will allow us to just type .spotifyGreen and you wont have to use ColorManager.spotifyGreen
extension Color {
    static let backgroundColor = Color("BackgroundColor")
    static let accentColor = Color("AccentColor")
    static let secondaryAccentColor = Color("SecondaryAccentColor")
    static let tertiaryAccentColor = Color("TertiaryAccentColor")
    static let ratingsColor = Color("RatingsColor")
 
}
