import ForecastFormValue from "./ForecastFormValue";
import moment from "moment";

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
        // const startDateValue = new Date();
        // //Sets minimum date to today
        // startDateValue.setDate(startDateValue.getDate());
        this.startDate = moment().format('YYYY-MM-DD')
        this.endDate = values.date;
    }

}