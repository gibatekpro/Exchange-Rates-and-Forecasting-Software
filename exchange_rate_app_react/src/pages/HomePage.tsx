import ConversionComponentBackground from "../components/ConversionComponentBackground";
import React, {useEffect, useState} from "react";
import RatesComponent from "../components/RatesComponent";
import FormValue from "../model/FormValue";
import {ConversionApiResponse} from "../model/ConversionApiResponse";
import {Option} from "react-bootstrap-typeahead/types/types";
import {useFormik} from "formik";
import {Util} from "../util/utils";
import ConversionComponent from "../components/ConversionComponent";

// Initial state value
const initialConversionData: ConversionApiResponse = {
    success: false,
    query: {
        from: "",
        to: "",
        amount: 0,
    },
    info: {
        timestamp: 0,
        rate: 0,
    },
    date: "",
    historical: false,
    result: 0,
};


export const HomePage: React.FC = () => {

    const [fromSelection, setFromSelection] = useState([] as Option[]);
    const [toSelection, setToSelection] = useState([] as Option[]);
    const [conversionDate, setConversionDate] = useState(new Date().toISOString().split('T')[0]);
    const [initialValues, setInitialValues] = useState<FormValue>({
        amount: 1,
        fromCurrency: '',
        toCurrency: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [options, setOptions] = useState([] as Option[]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [conversionData, setConversionData] = React.useState(initialConversionData)
    const conversionUrl: string = `${Util.apiUrl}rates/convert`;
    const currencyListUrl: string = `${Util.apiUrl}rates/currency-list`;

    //Fetches the currency list
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch(currencyListUrl);
                const data = await response.json();
                if (data.success) {
                    const currencyOptions = Object.entries(data.symbols).map(([code, name]) => ({
                        label: `${code} - ${name} `,
                        value: code
                    }));
                    setOptions(currencyOptions);
                } else {
                    console.error('Failed to fetch currencies:', data);
                }
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        const fetchInitialConversion = async () => {

            // setIsLoading(true)
            // setFromSelection(getSpecialFieldValue(options, "USD"));
            // setToSelection(getSpecialFieldValue(options, "USD"));

            try {
                //Query params
                const queryParams = new URLSearchParams({
                    from: "GBP",
                    to: "USD",
                    amount: "1",
                    date: new Date().toISOString().split('T')[0] // Formats the current date as YYYY-MM-DD
                });

                const response = await fetch(`${conversionUrl}?&${queryParams}`);
                const data = await response.json();

                if (data.success) {
                    //Handles the successful response
                    console.log('Conversion data:', data);
                    setConversionData(data as ConversionApiResponse)
                    console.log(conversionData)
                } else {
                    console.error('Failed to fetch conversion:', data);
                }
            } catch (error) {
                console.error('Error fetching conversion:', error);
            } finally {
                setIsLoading(false)
            }

        }

        fetchCurrencies();
        fetchInitialConversion();
    }, [currencyListUrl]);


    const submitForm = (values: FormValue) => {

        setIsLoading(true);

        const convert = async () => {
            //Converts the number to a string with commas, if necessary
            let amountWithCommas: string = values.amount.toLocaleString();

            //Removes commas, convert to number, and back to string
            const amountString: string = Number(amountWithCommas.replace(/,/g, '')).toString();

            try {
                //Query params
                const queryParams = new URLSearchParams({
                    from: values.fromCurrency.valueOf(),
                    to: values.toCurrency,
                    amount: amountString,
                    date: values.date
                });

                const response = await fetch(`${conversionUrl}?&${queryParams}`);
                const data = await response.json();

                if (data.success) {
                    //Handles the successful response
                    console.log('Conversion data:', data);
                    setConversionData(data as ConversionApiResponse)
                    console.log(conversionData)
                } else {
                    console.error('Failed to fetch conversion:', data);
                }
            } catch (error) {
                console.error('Error fetching conversion:', error);
            } finally {
                setIsLoading(false)
            }
        };

        convert();
    };


    return (
        <div>
            <div>
                <ConversionComponent
                    submitForm={submitForm}
                    initialValues={initialValues}
                    options={options}
                    conversionData={conversionData}
                    isLoading={isLoading}
                    fromSelection={fromSelection}
                    toSelection={toSelection}
                    setToSelection={setToSelection}
                    setFromSelection={setFromSelection}/>
                <div className='d-lg-none' style={{
                    minHeight: "400px",
                }}>
                </div>
                <RatesComponent
                    conversionData={conversionData}/>
            </div>
        </div>
    );
}