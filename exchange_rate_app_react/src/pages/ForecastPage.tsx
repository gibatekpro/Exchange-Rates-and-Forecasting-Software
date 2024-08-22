import React, {useEffect, useState} from "react";
import {Util} from "../util/utils";
import {Option} from "react-bootstrap-typeahead/types/types";
import ForecastFormValue from "../model/ForecastFormValue";
import {ForecastModelsExplanation} from "../components/ForecastModelsExplanation";
import {ForecastComponent} from "../components/ForecastComponent";
import {ForecastRequestBody} from "../model/ForecastRequestBody";
import {ForecastApiResponse} from "../model/ForecastApiResponse";
import {ForecastGraph} from "../components/ForecastGraph";
import {ForecastComparisonApiResponse} from "../model/ForecastComparisonApiResponse";
import {ForecastComparisonComponent} from "../components/ForecastComparisonComponent";
import moment from "moment/moment";


export const ForecastPage: React.FC = () => {
    const [baseSelection, setBaseSelection] = useState([] as Option[]);
    const [forecastSelection, setForecastSelection] = useState([] as Option[]);
    const [options, setOptions] = useState([] as Option[]);
    const [isLoading, setIsLoading] = React.useState(false)
    const [forecastData, setForecastData] = useState<ForecastApiResponse>()
    const [forecastComparisonData, setForecastComparisonData] = useState<ForecastComparisonApiResponse>()
    const forecastUrl = `${Util.apiUrl}forecast/data`
    const forecastComparisonUrl = `${Util.apiUrl}forecast/comparison-data`
    const [initialValues, setInitialValues] = useState<ForecastFormValue>({
        method: '',
        baseCurrency: '',
        forecastCurrency: '',
        date: moment().add(1,'day').format('YYYY-MM-DD')
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

        const fetchForecastComparisonData = async () => {
            try {
                const response = await fetch(forecastComparisonUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ForecastComparisonApiResponse = await response.json();
                if (data.success) {
                    setForecastComparisonData(data);
                    console.log(data);
                } else {
                    console.error('Failed to fetch comparison data:', data);
                }
            } catch (error) {
                console.error('Error fetching comparison data:', error);
            }
        };
        fetchCurrencies();
        fetchForecastComparisonData();

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
            {
                forecastData &&
                <ForecastGraph
                    forecastData={forecastData}
                />
            }
            <ForecastModelsExplanation/>
            {
                forecastComparisonData &&
                <ForecastComparisonComponent
                    forecastComparisonData={forecastComparisonData}
                />
            }
        </div>
    )

}