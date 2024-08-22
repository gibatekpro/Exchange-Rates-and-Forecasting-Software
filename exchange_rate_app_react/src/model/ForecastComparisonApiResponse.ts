import {CurrencyForecast} from "./CurrencyForecast";

export class ForecastComparisonApiResponse {
    success: boolean;
    forecastComparisons: ForecastComparisonApiResponse.ForecastItem[];

    constructor(success: boolean, forecastComparisons: ForecastComparisonApiResponse.ForecastItem[]) {
        this.success = success;
        this.forecastComparisons = forecastComparisons;
    }
}

export namespace ForecastComparisonApiResponse {
    export class ForecastItem {
        conversionRate: number;
        forecastData: CurrencyForecast;

        constructor(conversionRate: number, forecastData: CurrencyForecast) {
            this.conversionRate = conversionRate;
            this.forecastData = forecastData;
        }
    }
}