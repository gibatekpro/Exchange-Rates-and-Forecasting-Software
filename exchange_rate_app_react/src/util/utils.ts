export const Util = {
    apiUrl: 'http://localhost:3031/api/v1/',
    baseUrl: 'http://localhost:3031/api/v1/',
    stripeKey: 'pk_test_51N5XrvG4mCGEpPxu7qpEIfRNYKHwzzoA2ZmAYQeYX3evd6qXwFPzK8OT5f4kspvLyfw91k737pZ62JMFHrmjUYRF00wwqOxI6R',
    googleMapApiKey: 'AIzaSyDSjUFexb8QOXq3py5QRGUOYY6J-mVjFPE'
};

export const CurrencyValue = (value: number | string): string => {
    return `£${parseFloat(value as string).toFixed(2)}`;
};

export const firebaseConfig = {
    apiKey: "AIzaSyB4a5MepQIJluFC57HA0xxY0O5h-39b69Q",
    authDomain: "exchange-rate-app-9a2c0.firebaseapp.com",
    projectId: "exchange-rate-app-9a2c0",
    storageBucket: "exchange-rate-app-9a2c0.appspot.com",
    messagingSenderId: "484213195051",
    appId: "1:484213195051:web:e16da4064e65039d73856e",
    measurementId: "G-DCT3RY88QJ"
};