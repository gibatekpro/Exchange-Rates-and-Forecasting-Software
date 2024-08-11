//
//  ResetPasswordView.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import SwiftUI

struct ResetPasswordView : View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @Environment(\.presentationMode) var presentationMode
    @State private var username: String = ""
    @State private var errorMessage: String? = nil
    @FocusState var isFocused
    @State private var loading = false
    @State private var showAlert = false
    @State private var showAlertB = false
    @State private var alertMessage = ""
    @State private var alertMessageB = ""
    
    var body: some View {
        ZStack {
            ColorManager.backgroundColor
                .edgesIgnoringSafeArea(.all)
            
            ScrollView{
                Spacer(minLength: 20)
                Spacer(minLength: 20)
                
                VStack  {
                    //TODO: logo
                    //                Image("AppLogo")
                    //                    .resizable()
                    //                    .scaledToFit()
                    //                    .frame(width: 180, height: 180)
                    
                    Spacer(minLength: 20)
                    Spacer(minLength: 20)
                    
                    Text("Reset Password")
                        .font(Font.system(size: 25, weight: .bold))
                        .foregroundColor(Color.black)
                        .multilineTextAlignment(.center)
                        .focused($isFocused)
                    
                    VStack(spacing: 10){
                        TextField("", text: $username, prompt: Text("Email").foregroundColor(.gray))
                            .autocapitalization(.none)
                            .keyboardType(.emailAddress)
                            .padding()
                            .background(RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.9), lineWidth: 1))
                            .padding(10)
                            .foregroundColor(Color.black.opacity(0.7))
                            .focused($isFocused)
                        
                        //                    if errorMessage != nil {
                        //
                        //                        VStack(alignment: .leading, spacing: 5) {
                        //                            Text(errorMessage!)
                        //                                .multilineTextAlignment(.leading)
                        //                                .font(.system(size: 15, weight: .regular))
                        //                                .foregroundColor(.red)
                        //                                .padding()
                        //                        }
                        //                    }
                        
                        if errorMessage != nil && !isFocused {
                            
                            VStack(alignment: .leading, spacing: 5) {
                                Text(errorMessage!)
                                    .multilineTextAlignment(.leading)
                                    .font(.system(size: 15, weight: .regular))
                                    .foregroundColor(.red)
                                    .padding()
                            }
                        }
                        
                        if loading {
                            
                            VStack(alignment: .leading, spacing: 5) {
                                Spinner()
                            }
                        }
                        
                        Button(action: {
                            alertMessage = "Are you sure you want to reset your password?"
                            showAlert = true
                        }) {
                            Text("Reset")
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
                            Text("Log In")
                                .underline()
                                .font(Font.system(size: 13, weight: .bold))
                                .foregroundColor(.gray)
                                .padding(20)
                        }
                    }.padding()
                        .alert(alertMessage, isPresented: $showAlert) {
                            Button("Cancel", role: .cancel) {}
                            Button("Yes", role: .destructive) {
                                resetPassword()
                            }
                        }
                        .alert(alertMessageB, isPresented: $showAlertB) {
                            Button("Ok", role: .cancel) {
                                loading = false
                                presentationMode.wrappedValue.dismiss()
                                
                            }
                        }
                }
            }
        }
    }
    
    private func resetPassword() {
        isFocused = false
        loading = true
        errorMessage = nil
        if !username.isValidEmail() {
            errorMessage = "Invalid email address."
            loading = false
            return
        } 
        
        Task {
            
            authViewModel.resetPassword(email: username){ result in
                
                switch result {
                case .success(let message):
                    //login was successful
                    loading = false
                    print(message)
                    
                case .failure(let error):
                    //login failed
                    errorMessage = error.localizedDescription
                    loading = false
                    print("Login failed with error: \(error.localizedDescription)")
                }
                
            }
            
        }
    }
}

#Preview {
    ResetPasswordView()
        .environmentObject(AuthViewModel())
}

