import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyB4a5MepQIJluFC57HA0xxY0O5h-39b69Q",
    authDomain: "exchange-rate-app-9a2c0.firebaseapp.com",
    projectId: "exchange-rate-app-9a2c0",
    storageBucket: "exchange-rate-app-9a2c0.appspot.com",
    messagingSenderId: "484213195051",
    appId: "1:484213195051:web:e16da4064e65039d73856e",
    measurementId: "G-DCT3RY88QJ"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
