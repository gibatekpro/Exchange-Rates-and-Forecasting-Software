import React, {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {Button, Card, Col, Container, InputGroup, Row} from "react-bootstrap";
import backgroundImage3 from "../assets/images/backgroundImage3.webp";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {getFieldValue, Util} from "../util/utils";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Option} from "react-bootstrap-typeahead/types/types";
import FormValue from "../model/FormValue";
import ForecastFormValue from "../model/ForecastFormValue";
import {ConversionApiResponse} from "../model/ConversionApiResponse";
import {EmaAccordion} from "../components/forecast_models_accordion/EmaAccordion";
import {SmaAccordion} from "../components/forecast_models_accordion/SmaAccordion";
import {ForecastModelsExplanation} from "../components/ForecastModelsExplanation";
import {ForecastComponent} from "../components/ForecastComponent";
import {ForecastRequestBody} from "../model/ForecastRequestBody";
import * as util from "node:util";
import {ForecastApiResponse} from "../model/ForecastApiResponse";
import {ForecastGraph} from "../components/ForecastGraph";


export const ForecastPage: React.FC = () => {
    const [baseSelection, setBaseSelection] = useState([] as Option[]);
    const [forecastSelection, setForecastSelection] = useState([] as Option[]);
    const [options, setOptions] = useState([] as Option[]);
    const [isLoading, setIsLoading] = React.useState(false)
    const [forecastData, setForecastData] = useState<ForecastApiResponse>()
    const forecastUrl = `${Util.apiUrl}forecast/data`
    const today = new Date();
    console.log(">>>> Today is " + today.toISOString().split('T')[0]);

    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(today.getDate() + 1);
    console.log(">>>> Tomorrow is " + tomorrowDate.toISOString().split('T')[0]);

    const [initialValues, setInitialValues] = useState<ForecastFormValue>({
        method: '',
        baseCurrency: '',
        forecastCurrency: '',
        date: tomorrowDate.toISOString().split('T')[0]
    });
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

        fetchCurrencies();

    }, []);

    const submitForm = (values: ForecastFormValue) => {

        setIsLoading(true);

        const forecastParams = new ForecastRequestBody(values);

        console.log(forecastParams);

        const forecast = async () => {

            try {
                //Query params
                const queryParams = new URLSearchParams({
                    method: forecastParams.method,
                    baseCurrency: forecastParams.baseCurrency,
                    forecastCurrency: forecastParams.forecastCurrency,
                    startDate: forecastParams.startDate,
                    endDate: forecastParams.endDate
                });

                const response = await fetch(`${forecastUrl}?${queryParams}`);
                const data = await response.json();

                if (data.success) {
                    //Handles the successful response
                    setForecastData(data as ForecastApiResponse)
                    console.log(forecastData);
                } else {
                    console.error('Failed to fetch forecast:', data);
                }
            } catch (error) {
                console.error('Error fetching forecasts:', error);
            } finally {
                setIsLoading(false)
            }
        };

        forecast();

    };


    return (
        <div>

            <ForecastComponent submitForm={submitForm}
                               initialValues={initialValues}
                               options={options}
                               isLoading={isLoading}
                               baseSelection={baseSelection}
                               forecastSelection={forecastSelection}
                               setForecastSelection={setForecastSelection}
                               setBaseSelection={setBaseSelection}/>
            {forecastData &&
                <ForecastGraph
                    forecastData={forecastData}
                />
            }
            <ForecastModelsExplanation/>

        </div>
    )

}