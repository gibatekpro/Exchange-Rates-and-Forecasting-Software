

export interface TimeSeriesApiResponse {

    success: boolean;
    timeseries: boolean;
    start_date: string;
    end_date: string;
    base: string;
    to: string;

    rates: {
        [key: string]: {
            [currency: string]: number;
        };
    };
}