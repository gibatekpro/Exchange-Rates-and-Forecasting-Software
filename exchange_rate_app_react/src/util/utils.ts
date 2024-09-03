
import {Option} from "react-bootstrap-typeahead/types/types";

const baseUrlDev: string = 'http://localhost:3031';
const baseUrlProd: string = 'https://gibatekpro.com';

export const Util = {
    apiUrl: `${baseUrlProd}/api/v1/`,
    googleMapApiKey: 'AIzaSyDSjUFexb8QOXq3py5QRGUOYY6J-mVjFPE'
};

export const CurrencyValue = (value: number | string): string => {
    return `£${parseFloat(value as string).toFixed(2)}`;
};
//d1iohvb35tah1i.cloudfront.net.
export const firebaseConfig = {
    apiKey: "AIzaSyB4a5MepQIJluFC57HA0xxY0O5h-39b69Q",
    authDomain: "exchange-rate-app-9a2c0.firebaseapp.com",
    projectId: "exchange-rate-app-9a2c0",
    storageBucket: "exchange-rate-app-9a2c0.appspot.com",
    messagingSenderId: "484213195051",
    appId: "1:484213195051:web:e16da4064e65039d73856e",
    measurementId: "G-DCT3RY88QJ"
};

export function getFieldValue(selected: Option[]): any {
    if (selected.length > 0) {
        return selected.map(option => {
            const jsonOption = JSON.stringify(option);
            const parsedOption = JSON.parse(jsonOption);
            return parsedOption.value;
        })[0];
    }
    return '';
}

export const appName: string = "Exchange R";