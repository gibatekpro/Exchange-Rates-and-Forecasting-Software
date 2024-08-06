import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {AuthProvider} from "./services/auth_guard/AuthProvider";
import {firebaseConfig} from "./util/utils";
import { getAnalytics } from "firebase/analytics";
import initializeApp = firebase.initializeApp;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {RegisterPage} from "./pages/auth/RegisterPage";
import {LoginPage} from "./pages/auth/LoginPage";
import {RequireAuth} from "./services/auth_guard/RequireAuth";
import {ProtectedPage} from "./pages/ProtectedPage";
import {ResetPasswordPage} from "./pages/auth/ResetPasswordPage";


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = app.auth()

function App() {
    // Initialize Firebase

    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <div className="app-body d-flex flex-column">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        <Route path="/protected"
                               element={
                                   <RequireAuth>
                                       <ProtectedPage/>
                                   </RequireAuth>
                               }>
                        </Route>
                    </Routes>
                </div>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;
