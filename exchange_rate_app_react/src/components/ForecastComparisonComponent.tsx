import React from "react";
import {ForecastComparisonApiResponse} from "../model/ForecastComparisonApiResponse";
import {Table} from "react-bootstrap";

type ForecastComparisonComponentProps = {
    forecastComparisonData: ForecastComparisonApiResponse
}

export const ForecastComparisonComponent: React.FC<ForecastComparisonComponentProps> = ({forecastComparisonData}) => {
    return (
        <div className="bg-body-tertiary mt-5" style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <section className="text-center container row py-5 mt-5">
                <h1 className="h1">Forecasting Technique Comparison</h1>
                <p className="lead text-body-secondary" style={{
                    textAlign: "justify"
                }}>

                    We provide a table that displays currency forecasts made for the next day, alongside the actual
                    currency values that materialized. These forecasts were generated yesterday, aiming to predict
                    today's currency rates. By comparing these predicted values with the actual values observed today,
                    users can evaluate the accuracy of different forecasting methods.

                </p>
                <p className="lead text-body-secondary" style={{
                    textAlign: "justify"
                }}>

                    You have the option to review these predictions and select which forecast you believe was the most
                    accurate in predicting today's currency rates. This helps in understanding the effectiveness of each
                    forecasting method and allows for more informed decisions in the future. The currencies were valued
                    against the US Dollar (USD).

                </p>
                <Table striped responsive bordered className="py-5 mt-5">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Base Currency</th>
                        <th>Forecast Currency</th>
                        <th>SMA Forecast</th>
                        <th>EMA Forecast</th>
                        <th>LSM Forecast</th>
                        <th>Actual Rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {forecastComparisonData?.forecastComparisons.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.forecastData.baseCurrency.currencyCode}</td>
                            <td>{item.forecastData.forecastCurrency.currencyCode}</td>
                            <td>{item.forecastData.smaRate}</td>
                            <td>{item.forecastData.emaRate}</td>
                            <td>{item.forecastData.lsmRate}</td>
                            <td style={{
                                fontWeight: "bold"
                            }}>{item.conversionRate}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </section>
        </div>

    );
}