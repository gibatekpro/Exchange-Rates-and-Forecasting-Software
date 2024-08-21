import ForecastFormValue from "./ForecastFormValue";

export class ForecastRequestBody {
    method: string;
    baseCurrency: string;
    forecastCurrency: string;
    startDate: string;
    endDate: string;

    constructor(values: ForecastFormValue) {
        this.method = values.method;
        this.baseCurrency = values.baseCurrency;
        this.forecastCurrency = values.forecastCurrency;
        const startDateValue = new Date();
        //Sets minimum date to tomorrow
        startDateValue.setDate(startDateValue.getDate() + 1);
        this.startDate = startDateValue.toISOString().split('T')[0];
        this.endDate = values.date;
    }

}