import React, {useEffect} from 'react';
import 'firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css';
import {auth} from '../../util/firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const FirebaseAuthUI: React.FC = () => {
    useEffect(() => {
        const uiConfig = {
            callbacks: {
                uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/', //Redirect URL after successful sign-in
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                }
                //Add other providers if needed
            ],
        };

        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', uiConfig);
    }, []);

    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: "900px",
    }}>
        <div id="firebaseui-auth-container"></div>
    </div>;
};

export default FirebaseAuthUI;
