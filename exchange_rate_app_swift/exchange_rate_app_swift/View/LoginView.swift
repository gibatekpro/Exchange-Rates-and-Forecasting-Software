//
//  LoginView.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import Foundation
import SwiftUI

struct LoginView : View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var username: String = ""
    @State private var password: String = ""
    @State private var passwordVisibility: Bool = false
    @State private var loading: Bool = false
    @State private var errorMessage: String? = nil
    @FocusState var isFocused
    @State var isRegisterSheetPresented = false
    @State var isPasswordResetSheetPresented = false
    
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
                    Text("Welcome back")
                        .font(Font.system(size: 35, weight: .bold))
                        .foregroundColor(Color.black.opacity(0.7))
                        .multilineTextAlignment(.center)
                        .focused($isFocused)
                    
                    if loading {
                        
                        VStack(alignment: .leading, spacing: 5) {
                            Spinner()
                        }
                    }
                    
                    VStack(spacing: 10) {
                        TextField("", text: $username, prompt: Text("Email").foregroundColor(.gray))
                            .autocapitalization(.none)
                            .keyboardType(.emailAddress)
                            .padding()
                            .background(RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.gray.opacity(0.9), lineWidth: 1))
                            .padding(10)
                            .foregroundColor(.black.opacity(0.7))
                            .focused($isFocused)
                        
                        HStack {
                            if passwordVisibility {
                                TextField("", text: $password, prompt: Text("Password").foregroundColor(.gray))
                                    .autocapitalization(.none)
                                    .focused($isFocused)
                            } else {
                                SecureField("", text: $password, prompt: Text("Password").foregroundColor(.gray))
                                    .autocapitalization(.none)
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
                        .foregroundColor(.black.opacity(0.7))
                        
                        //                    if errorMessage != nil {
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
                        
                        HStack{
                            Spacer()
                            Button(action: {
                                isPasswordResetSheetPresented = true
                            }) {
                                Text("Forgot password ")
                                    .underline()
                                    .italic()
                                    .font(Font.system(size: 15, weight: .semibold))
                                    .foregroundColor(.gray)
                            }.padding(.trailing, 10)
                                .sheet(isPresented: $isPasswordResetSheetPresented, onDismiss: {
                                    
                                }) {
                                    ResetPasswordView()
                                }
                            
                        }
                        
                        Button(action: logIn) {
                            Text("Log In")
                                .font(Font.system(size: 20, weight: .bold))
                                .foregroundColor(.white)
                                .padding(10)
                                .frame(width: UIScreen.main.bounds.width - 53)
                                .background(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(.tertiaryAccent) // Use .fill instead of .foregroundColor for background color
                                )
                        }
                        .disabled(loading)
                        
                        Button(action: {
                            isRegisterSheetPresented = true
                        }) {
                            HStack{
                                Text("Don't have an account? ")
                                    .italic()
                                    .font(Font.system(size: 15, weight: .semibold))
                                    .foregroundColor(.black.opacity(0.7))
                                    .padding(0)
                                
                                Text("Sign Up")
                                    .underline()
                                    .font(Font.system(size: 15, weight: .bold))
                                    .foregroundColor(.blue)
                                    .padding(0)
                            }.padding(10)
                            
                        }.sheet(isPresented: $isRegisterSheetPresented, onDismiss: {
                            Task{
                                //                            await viewModel.checkAuthentication()
                            }
                        }) {
                            RegisterView()
                        }
                        
                        
                    }.padding()
                }
            }
            
        }
    }
    
    private func logIn() {
        isFocused = false
        loading = true
        errorMessage = nil
        if !username.isValidEmail() {
            errorMessage = "Invalid email address."
            loading = false
            return
        }
        
        Task {
            authViewModel.login(email: username, password: password) { result in
                switch result {
                case .success(let userId):
                    //login was successful
                    errorMessage = nil
                    loading = false
                    print("Login successful. User ID: \(userId)")
                    
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
    LoginView()
        .environmentObject(AuthViewModel())
}
