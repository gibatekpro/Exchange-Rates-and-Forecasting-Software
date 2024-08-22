import {Currency} from "./Currency";

export class CurrencyForecast {
    id: number;
    baseCurrency: Currency;
    forecastCurrency: Currency;
    conversionDate: Date;
    forecastDate: Date;
    actualRate: number;
    smaRate: number;
    emaRate: number;
    lsmRate: number;

    constructor(
        id: number,
        baseCurrency: Currency,
        forecastCurrency: Currency,
        conversionDate: Date,
        forecastDate: Date,
        actualRate: number,
        smaRate: number,
        emaRate: number,
        lsmRate: number
    ) {
        this.id = id;
        this.baseCurrency = baseCurrency;
        this.forecastCurrency = forecastCurrency;
        this.conversionDate = conversionDate;
        this.forecastDate = forecastDate;
        this.actualRate = actualRate;
        this.smaRate = smaRate;
        this.emaRate = emaRate;
        this.lsmRate = lsmRate;
    }
}