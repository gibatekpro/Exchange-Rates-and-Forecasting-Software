import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    deleteUser
} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {Util} from "../../util/utils";

//The shape of the auth context value was defined
interface AuthContextType {
    //Any properties or methods needed to be defined
    user: string | null;
    token: string | null;
    login: (email: string, password: string, callback: (user: string) => void) => Promise<void>;
    resetPassword: (email: string, callback: (message: string) => void) => Promise<void>;
    register: (firstName: string, lastName: string, email: string, password: string, callback: (user: string) => void) => Promise<void>;
    logout: () => void;
}

//The auth context was created with a default value
const AuthContext = createContext<AuthContextType | null>(null);

//The props for the AuthProvider component were defined
interface AuthProviderProps {
    children: ReactNode;
}

//AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(localStorage.getItem('user'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        //useEffect is used to handle side effects
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            //onAuthStateChanged listens for changes in the user's sign-in state
            if (user) {
                const token = await user.getIdToken();
                setUser(user.uid);
                setToken(token);
                localStorage.setItem('user', user.uid);
                localStorage.setItem('token', token);
            } else {
                setUser(null);
                setToken(null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        });

        //cleanup function to unsubscribe from onAuthStateChanged
        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string, callback: (user: string) => void) => {
        //login function is used to sign in a user
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            setUser(user.uid);
            setToken(token);
            localStorage.setItem('user', user.uid);
            localStorage.setItem('token', token);
            callback(user.uid);
        } catch (error) {
            console.error("Login Error: ", error);
            throw error;
        }
    };


    const resetPassword = async (email: string, callback: (message: string) => void) => {
        //reset password function is used to reset user's password
        try {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    callback("An email has been sent to you. Please follow the instructions in the email.")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    callback(errorMessage);
                });
        } catch (error) {
            console.error("Password Reset Error: ", error);
            throw error;
        }
    };

    const register = async (firstName: string, lastName: string, email: string, password: string, callback: (user: string) => void) => {
        //register function is used to create a new user
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            setUser(user.uid);
            setToken(token);
            localStorage.setItem('user', user.uid);
            localStorage.setItem('token', token);
            try {
                const requestBody = JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    uid: user.uid,
                });
                const response = await fetch(`${Util.apiUrl}auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: requestBody,
                });

                if (response.ok) {
                    console.log(response);
                    callback("Registration Successful.");
                } else {
                    await deleteAccount(message => {
                        //Delete the user from firebase if it fails to save in back end
                        callback(message)

                    })
                    console.log(response)
                }
            } catch (error: any) {
                await deleteAccount(message => {
                    //Delete the user from firebase if it fails to save in back end
                    callback(message)

                })
                console.error("Registration Error:", error.message);
            }
        } catch (error) {
            await deleteAccount(message => {
                //Delete the user from firebase if it fails to save in back end
                callback(message)

            })
            console.error("Register Error: ", error);
            throw error;
        }
    };

    const logout = async () => {
        //logout function is used to log a user out
        try {
            const auth = getAuth();
            await signOut(auth);
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error("Logout Error: ", error);
        }
    };

    const deleteAccount = async (callback:(message: string) => void) => {
        //logout function is used to log a user out
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user != null) {
                deleteUser(user).then(() => {
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    // User deleted.
                    callback("Could not save user.")
                }).catch((error) => {
                    // An error occurred
                    // ...
                    callback(error)
                });
            }
            callback("No user found")
        } catch (error: any) {
            console.error("Logout Error: ", error);
            callback(error)
        }
    };

    const value = { user, token, login, register, logout, resetPassword };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

//useAuth is a custom hook to use auth context
export function useAuth(): AuthContextType | null {
    return useContext(AuthContext);
}
