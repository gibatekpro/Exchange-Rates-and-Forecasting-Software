
export interface ForecastApiResponse {

    success: boolean;
    baseCurrency: string;
    forecastCurrency: string;
    rates: Rates;
    timeseries: boolean;
    start_date: string;
    end_date: string;

}

export interface Rates {
    [date: string]: {
        [currency: string]: number;
    };
}