import React, {useEffect, useState} from 'react';
import {useAuth} from "../services/auth_guard/AuthProvider";
import {appName} from "../util/utils";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const Navbar = () => {
    const [loggedIn, setLogedIn] = useState<boolean>(false)
    let auth = useAuth();

    useEffect(() => {
        //useEffect is used to handle side effects
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            //onAuthStateChanged listens for changes in the user's sign-in state
            if (user) {
                const token = await user.getIdToken();
                setLogedIn(true)
            } else {
                setLogedIn(false)
            }
        });

        //cleanup function to unsubscribe from onAuthStateChanged
        return () => unsubscribe();
    }, []);


    const performLogout = () => {

        auth?.logout();

    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-light">
                <div className="container-fluid">
                    <a className="logo mx-3" href="/">{appName}</a>
                    <div className="d-flex ">
                        <div className=" navbar-toggler mb-1 mb-md-0 ms-md-0 me-2  align-items-end justify-content-end">
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#252B42"
                                 className="bi bi-list " viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="ms-md-5"></div>
                        <ul className="navbar-nav me-auto mb-2 mb-md-0 ms-md-5">
                            <li className="nav-item">
                                <a className="Text black fw-bold nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="Text black fw-bold nav-link" href="/forecast">Forecast</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav d-flex mb-2 me-5 mb-md-0 ms-md-5">
                            <li className="nav-item" hidden={true}>
                                <a className="Icon fw-normal Text blue fw-bold nav-link" aria-current="page"
                                   href="/account-page" style={{color: "green"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         className="bi bi-person me-1 mb-1" viewBox="0 0 16 16" fill="green">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                    </svg>
                                    Hi Tony</a>
                            </li>
                            <li className="nav-item" hidden={!loggedIn}>
                                <a className="Icon fw-normal Text blue fw-bold nav-link" aria-current="page"
                                   type="button"
                                   onClick={performLogout}
                                >
                                    Logout</a>
                            </li>
                            <li className="nav-item" hidden={loggedIn}>
                                <a
                                    className="Icon fw-normal Text blue fw-bold nav-link" aria-current="page"
                                    href="/login" type="button"
                                    //TODO: state={{from: location}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         className="bi bi-person me-1 mb-1" viewBox="0 0 16 16">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                                        />
                                    </svg>
                                    Login
                                </a> {/* Use Link for navigation */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;