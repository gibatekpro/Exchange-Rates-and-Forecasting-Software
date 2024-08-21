import {AgCharts} from "ag-charts-react";
import {Col, Row} from "react-bootstrap";
import {ButtonTimeSeries} from "./ButtonTimeSeries";
import React, {useEffect, useState} from "react";
import {TimeSeriesApiResponse} from "../model/TimeSeriesApiResponse";
import {AgChartOptions} from "ag-charts-community";
import {ForecastApiResponse} from "../model/ForecastApiResponse";
import {number} from "yup";

type ForecastGraphProps = {
    forecastData: ForecastApiResponse,
}

export const ForecastGraph: React.FC<ForecastGraphProps> = ({
                                                                forecastData
                                                            }) => {

    const designBorder = {
        // border: '1px solid black',
        // border: 'none',
    };

    //Function to transform the forecastData into the format expected by the chart
    function transformData() {
        const ratesEntries = Object.entries(forecastData.rates);

        const transformedData = ratesEntries.map(([date, rates]) => {

            return {
                date: date,
                value: rates[forecastData.forecastCurrency] || 0,
            };
        });

        return transformedData;
    }

    //Calculates the number of days between two dates
    function calculateDaysBetween(forecastData: ForecastApiResponse): number {
        const start = new Date(forecastData.start_date);
        const end = new Date(forecastData.end_date);
        const differenceInTime = end.getTime() - start.getTime();
        return differenceInTime / (1000 * 3600 * 24);
    }

    const numberOfDays = calculateDaysBetween(forecastData);

    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: numberOfDays > 1 ? `${forecastData.baseCurrency} to ${forecastData.forecastCurrency} (Showing forecast for ${numberOfDays} days)`
                : `${forecastData.baseCurrency} to ${forecastData.forecastCurrency} (Showing forecast for ${numberOfDays} day)`,
        },
        data: transformData(),
        series: [
            {
                type: "line",
                xKey: "date",
                yKey: "value",
                yName: forecastData.forecastCurrency,
            }
        ],
    });

    //Update chart options when forecastData changes
    useEffect(() => {
        setOptions({
            ...options,
            title: {
                text: numberOfDays > 1 ?
                    `${forecastData.baseCurrency} to ${forecastData.forecastCurrency} (Showing forecast for ${numberOfDays} days)`
                    : `${forecastData.baseCurrency} to ${forecastData.forecastCurrency} (Showing forecast for ${numberOfDays} day)`,
            },
            data: transformData(),
            series: [
                {
                    type: "line",
                    xKey: "date",
                    yKey: "value",
                    yName: forecastData.forecastCurrency,
                } as any
            ],
        });
    }, [forecastData]);


    return (
        <div className="bg-body-tertiary">

            <div className="bg-body-tertiary" style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '5%',
                marginLeft: '5%',
                padding: '5%',
                ...designBorder
            }}>
                <AgCharts options={options}/>
            </div>
        </div>
    );
}