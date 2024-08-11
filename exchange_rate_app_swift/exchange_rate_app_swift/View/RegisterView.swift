//
//  RegisterView.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import SwiftUI

struct RegisterView : View {
    @EnvironmentObject private var authViewModel: AuthViewModel
    @Environment(\.presentationMode) var presentationMode
    @State private var firstName: String = ""
    @State private var lastName: String = ""
    @State private var username: String = ""
    @State private var password: String = ""
    @State private var confirmPassword: String = ""
    @State private var rememberPassword = false
    @State private var passwordVisibility: Bool = false
    @State private var confirmPasswordVisibility: Bool = false
    @State private var loading: Bool = false
    @State private var errorMessage: String? = nil
    @FocusState var isFocused
    
    var body: some View {
        ZStack {
            ColorManager.backgroundColor
                .edgesIgnoringSafeArea(.all)
            
            ScrollView{
                VStack{
                    
                    //TODO: logo
                    //            VStack(spacing: 40) {
                    //                Image("AppLogo")
                    //                    .resizable()
                    //                    .scaledToFit()
                    //                    .frame(width: 180, height: 180)
                    Spacer(minLength: 20)
                    Spacer(minLength: 20)
                    Text("Register")
                        .font(Font.system(size: 35, weight: .bold))
                        .foregroundColor(Color.black.opacity(0.7))
                        .multilineTextAlignment(.center)
                        .focused($isFocused)
                    
                    if loading {
                        
                        VStack(alignment: .leading, spacing: 5) {
                            Spinner()
                        }
                    }
                    
                    VStack(spacing: 10){
                        TextField("", text: $firstName, prompt: Text("First Name").foregroundColor(.gray))
                            .autocapitalization(.none)
                            .keyboardType(.default)
                            .padding()
                            .background(RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.9), lineWidth: 1))
                            .padding(10)
                            .foregroundColor(Color.black.opacity(0.7))
                            .focused($isFocused)
                        
                        TextField("", text: $lastName, prompt: Text("Last Name").foregroundColor(.gray))
                            .autocapitalization(.none)
                            .keyboardType(.default)
                            .padding()
                            .background(RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.9), lineWidth: 1))
                            .padding(10)
                            .foregroundColor(Color.black.opacity(0.7))
                            .focused($isFocused)
                        
                        TextField("", text: $username, prompt: Text("Email").foregroundColor(.gray))
                            .autocapitalization(.none)
                            .keyboardType(.emailAddress)
                            .padding()
                            .background(RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.9), lineWidth: 1))
                            .padding(10)
                            .foregroundColor(Color.black.opacity(0.7))
                            .focused($isFocused)
                        
                        HStack {
                            if passwordVisibility {
                                TextField("", text: $password, prompt: Text("Password").foregroundColor(.gray))
                                    .autocapitalization(.none)
                                    .foregroundColor(.black)
                                    .focused($isFocused)
                            } else {
                                SecureField("", text: $password, prompt: Text("Password").foregroundColor(.gray))
                                    .autocapitalization(.none)
                                    .foregroundColor(.black)
                                    .focused($isFocused)
                            }
                            Button(action: {
                                self.passwordVisibility.toggle()
                            }) {
                                Image(systemName: passwordVisibility ? "eye.slash.fill" : "eye.fill")
                                    .foregroundColor(Color.gray.opacity(0.7))
                            }
                        }
                        .padding()
                        .background(RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.gray.opacity(0.9), lineWidth: 1))
                        .padding(10)
                        .foregroundColor(Color.white.opacity(0.7))
                        
                        HStack {
                            if confirmPasswordVisibility {
                                TextField("", text: $confirmPassword, prompt: Text("Confirm Password").foregroundColor(.gray))
                                    .autocapitalization(.none)
                                    .foregroundColor(.black)
                                    .focused($isFocused)
                            } else {
                                SecureField("", text: $confirmPassword, prompt: Text("Confirm Password").foregroundColor(.gray))
                                    .autocapitalization(.none)
                                    .foregroundColor(.black)
                                    .focused($isFocused)
                            }
                            Button(action: {
                                self.confirmPasswordVisibility.toggle()
                            }) {
                                Image(systemName: confirmPasswordVisibility ? "eye.slash.fill" : "eye.fill")
                                    .foregroundColor(Color.gray.opacity(0.7))
                            }
                        }
                        .padding()
                        .background(RoundedRectangle(cornerRadius: 12)
                            .stroke(Color.gray.opacity(0.9), lineWidth: 1))
                        .padding(10)
                        .foregroundColor(Color.white.opacity(0.7))
                        
                        //                if errorMessage != nil {
                        //
                        //                    VStack(alignment: .leading, spacing: 5) {
                        //                        Text(errorMessage!)
                        //                            .multilineTextAlignment(.leading)
                        //                            .font(.system(size: 15, weight: .regular))
                        //                            .foregroundColor(.red)
                        //                            .padding()
                        //                    }
                        //                }
                        
                        if errorMessage != nil && !isFocused {
                            
                            VStack(alignment: .leading, spacing: 5) {
                                Text(errorMessage!)
                                    .multilineTextAlignment(.leading)
                                    .font(.system(size: 15, weight: .regular))
                                    .foregroundColor(.red)
                                    .padding()
                            }
                        }
                        
                        
                        Button(action: signUp) {
                            Text("Register")
                                .font(Font.system(size: 20, weight: .bold))
                                .foregroundColor(Color.white)
                                .padding(10)
                                .frame(width: UIScreen.main.bounds.width - 53)
                                .background(
                                    RoundedRectangle(cornerRadius: 10)
                                        .foregroundColor(.tertiaryAccentColor)
                                )
                        }.padding(20)
                            .disabled(loading)
                        
                        Button(action: {
                            presentationMode.wrappedValue.dismiss()
                        }) {
                            HStack{
                                Text("Already have an account? ")
                                    .italic()
                                    .font(Font.system(size: 15, weight: .semibold))
                                    .foregroundColor(.black.opacity(0.7))
                                    .padding(0)
                                
                                Text("Log in")
                                    .underline()
                                    .font(Font.system(size: 15, weight: .bold))
                                    .foregroundColor(.blue)
                                    .padding(0)
                            }.padding(10)
                            
                        }
                    }
                    .padding()
                }}
        }
    }
    
    private func signUp() {
        
        isFocused = false
        loading = true
        errorMessage = nil
        
        if firstName.isEmpty {
            loading = false
            errorMessage = "First name is required."
            return
        }
        
        if lastName.isEmpty {
            loading = false
            errorMessage = "Last name is required."
            return
        }
        
        if !username.isValidEmail() {
            loading = false
            errorMessage = "Invalid email address."
            return
        }
        
        if !password.isValidPassword() {
            loading = false
            errorMessage = "Must contain uppercase, lowercase & number."
            return
        }
        
        if password != confirmPassword {
            loading = false
            errorMessage = "Passwords don't match."
            return
        }
        
        authViewModel.register(firstName: firstName, lastName: lastName, email: username, password: password) { result in
            
            switch result {
                
            case .success(let userId):
                //Registration was a success
                loading = false
                errorMessage = nil
                print("Registration successful. User Id: " + userId)
                
            case .failure(let error):
                //Registration failed
                errorMessage = error.localizedDescription
                loading = false
                print("Registration failed with error: " + error.localizedDescription)
                
            }
            
        }
    }
}

#Preview {
    RegisterView()
        .environmentObject(AuthViewModel())
}
