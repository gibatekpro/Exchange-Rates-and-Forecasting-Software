//
//  AuthViewModel.swift
//  exchange_rate_app_swift
//
//  Created by Anthony Gibah on 8/11/24.
//

import Foundation
import SwiftUI
import FirebaseAuth

class AuthViewModel: ObservableObject {
    @Published var user: User? = nil
    @Published var token: String? = nil
    @Published var authStateListenerHandle: AuthStateDidChangeListenerHandle?

    init() {
        let auth = Auth.auth()
        //Listener to check if user's authentication state has changedx
        authStateListenerHandle = auth.addStateDidChangeListener { [weak self] (_, user) in
            if let user = user {
                self?.user = user
                user.getIDToken { (token, error) in
                    if let token = token {
                        self?.token = token
                        UserDefaults.standard.set(user.uid, forKey: "user")
                        UserDefaults.standard.set(token, forKey: "token")
                    }
                }
            } else {
                self?.user = nil
                self?.token = nil
                UserDefaults.standard.removeObject(forKey: "user")
                UserDefaults.standard.removeObject(forKey: "token")
            }
        }
    }

    //Function authenticates a user with email and password, using firebase
    func login(email: String, password: String, completion: @escaping (Result<String, Error>) -> Void) {
        Auth.auth().signIn(withEmail: email, password: password) { [weak self] (authResult, error) in
            if let error = error {
                completion(.failure(error))
            } else if let user = authResult?.user {
                user.getIDToken { (token, error) in
                    if let token = token {
                        self?.user = user
                        self?.token = token
                        UserDefaults.standard.set(user.uid, forKey: "user")
                        UserDefaults.standard.set(token, forKey: "token")
                        completion(.success(user.uid))
                    }
                }
            }
        }
    }

    //Function sends a reset email to the user
    func resetPassword(email: String, completion: @escaping (Result<String, Error>) -> Void) {
        Auth.auth().sendPasswordReset(withEmail: email) { error in
            if let error = error {
                completion(.failure(error))
            } else {
                completion(.success("An email has been sent to you. Please follow the instructions in the email."))
            }
        }
    }

    //Function registers a user with email and password, using firebase
    func register(firstName: String, lastName: String, email: String, password: String, completion: @escaping (Result<String, Error>) -> Void) {
        Auth.auth().createUser(withEmail: email, password: password) { [weak self] (authResult, error) in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let user = authResult?.user else {
                completion(.failure(error!))
                return
            }

            user.getIDToken { (token, error) in
                if let token = token {
                    self?.user = user
                    self?.token = token
                    UserDefaults.standard.set(user.uid, forKey: "user")
                    UserDefaults.standard.set(token, forKey: "token")

                    let requestBody: [String: Any] = [
                        "firstName": firstName,
                        "lastName": lastName,
                        "email": email,
                        "uid": user.uid
                    ]

                    guard let url = URL(string: "\(BaseApi.apiUrl)auth/register"),
                          let httpBody = try? JSONSerialization.data(withJSONObject: requestBody, options: []) else {
                        completion(.failure(error!))
                        return
                    }

                    var request = URLRequest(url: url)
                    request.httpMethod = "POST"
                    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                    request.httpBody = httpBody

                    URLSession.shared.dataTask(with: request) { data, response, error in
                        if let error = error {
                            self?.deleteAccount { _ in }
                            completion(.failure(error))
                            print("Registration Error:", error.localizedDescription)
                            return
                        }

                        if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                            completion(.success(user.uid))
                        } else {
                            self?.deleteAccount { _ in }
                            completion(.failure(error!))
                        }
                    }.resume()
                } else {
                    self?.deleteAccount { _ in }
                    completion(.failure(error!))
                }
            }
        }
    }

    func logout() {
        do {
            try Auth.auth().signOut()
            self.user = nil
            self.token = nil
            UserDefaults.standard.removeObject(forKey: "user")
            UserDefaults.standard.removeObject(forKey: "token")
        } catch let error {
            print("Logout Error: \(error.localizedDescription)")
        }
    }

    func deleteAccount(completion: @escaping (String) -> Void) {
        let auth = Auth.auth()
        guard let user = auth.currentUser else {
            completion("No user found")
            return
        }

        user.delete { [weak self] error in
            if let error = error {
                completion(error.localizedDescription)
            } else {
                self?.user = nil
                self?.token = nil
                UserDefaults.standard.removeObject(forKey: "user")
                UserDefaults.standard.removeObject(forKey: "token")
                completion("Account deleted.")
            }
        }
    }
}
