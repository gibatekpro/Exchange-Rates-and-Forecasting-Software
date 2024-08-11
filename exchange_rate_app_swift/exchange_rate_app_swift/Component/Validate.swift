//
//  Validate.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import Foundation

//An extension in swift that allows to persorm actions on strings
extension String {
    
    func isValidEmail() -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\\.[A-Za-z]{2,}"
        let emailPred = NSPredicate(format:"SELF MATCHES %@", emailRegex)
        return emailPred.evaluate(with: self)
    }
    
    func isValidPassword() -> Bool {
        let passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$\\^\\-,_+=!%*?&])[A-Za-z\\d@$\\^\\-,_+=!%*?&]{8,}$"
        let passwordPred = NSPredicate(format: "SELF MATCHES %@", passwordRegex)
        return passwordPred.evaluate(with: self)
    }
}
