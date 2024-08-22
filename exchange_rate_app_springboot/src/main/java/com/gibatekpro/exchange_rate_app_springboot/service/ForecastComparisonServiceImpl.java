package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.entity.Currency;
import com.gibatekpro.exchange_rate_app_springboot.entity.CurrencyForecast;
import com.gibatekpro.exchange_rate_app_springboot.model.ConversionApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.ForecastApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.ForecastComparisonApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.ForecastRequestBody;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyForecastRepo;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class ForecastComparisonServiceImpl implements ForecastComparisonService {

    private final ConversionService conversionService;
    private final ForecastService forecastService;
    private final CurrencyRepo currencyRepo;
    private final CurrencyForecastRepo currencyForecastRepo;
    private final Logger logger = Logger.getLogger(getClass().getName());

    @Override
    @Transactional
    public void calculateForecastComparison() {

        //Create a list of the currencies
        List<String> forecastCurrencyList = new ArrayList<>();
        forecastCurrencyList.add("GBP");
        forecastCurrencyList.add("EUR");
        forecastCurrencyList.add("AUD");
        forecastCurrencyList.add("BTC");
        forecastCurrencyList.add("CAD");
        forecastCurrencyList.add("JPY");
        forecastCurrencyList.add("NGN");

        //Sets base currency
        String baseCurrency = "USD";

        //Fetches baseCurrencyOptional
        Optional<Currency> baseCurrencyOptional = currencyRepo.findByCurrencyCode(baseCurrency);

        //Base Currency Object
        Currency baseCurrencyObject = baseCurrencyOptional.orElseThrow();

        //Initialize a list of forecasts
        List<CurrencyForecast> currencyForecastList = new ArrayList<>();

        //Loops through the list of currencies
        for (String forecastCurrency : forecastCurrencyList) {

            //Today's date
            LocalDate today = LocalDate.now();

            //Tomorrow's date
            LocalDate tomorrow = today.plusDays(1);

            //Fetches today's conversion rate for each currency
            double conversionRate = getRateFromConversion(conversionService.getConversion(baseCurrency, forecastCurrency, 1.0, today));

            //Get the SMA Forecast for the currency
            double smaRate = getForecastForCurrency("sma", baseCurrency, forecastCurrency, today, tomorrow);

            //Get the EMA Forecast for the currency
            double emaRate = getForecastForCurrency("ema", baseCurrency, forecastCurrency, today, tomorrow);

            //Get the LSM Forecast for the currency
            double lsmRate = getForecastForCurrency("lsm", baseCurrency, forecastCurrency, today, tomorrow);

            //Fetches baseCurrencyOptional
            Optional<Currency> forecastCurrencyOptional = currencyRepo.findByCurrencyCode(forecastCurrency);

            //Forecast Currency Object
            Currency forecastCurrencyObject = forecastCurrencyOptional.orElseThrow();


            //Currency Forecast Object
            CurrencyForecast currencyForecast = new CurrencyForecast();
            currencyForecast.setBaseCurrency(baseCurrencyObject);
            currencyForecast.setForecastCurrency(forecastCurrencyObject);
            currencyForecast.setForecastDate(Date.from(tomorrow.atStartOfDay(ZoneId.of("UTC")).toInstant()));
            currencyForecast.setConversionDate(Date.from(today.atStartOfDay(ZoneId.of("UTC")).toInstant()));
            currencyForecast.setActualRate(conversionRate);
            currencyForecast.setSmaRate(smaRate);
            currencyForecast.setEmaRate(emaRate);
            currencyForecast.setLsmRate(lsmRate);

//            logger.info(">>>>>>>>>>" + currencyForecast.toString());

            //Add the forecast to the list
            currencyForecastList.add(currencyForecast);

        }

        //Save the forecast in the database
        currencyForecastRepo.saveAll(currencyForecastList);
    }

    @Override
    @Transactional
    public ForecastComparisonApiResponse getForecastComparisonData() {

        logger.info("getForecastComparisonData");

        //The forecast is for current day
        LocalDate localDateToday = LocalDate.now();

        //Convert to Date
        Date today = Date.from(localDateToday.atStartOfDay(ZoneId.of("UTC")).toInstant());

        //Fetch currency forecast data
        List<CurrencyForecast> currencyForecastList = currencyForecastRepo.findAllByForecastDate(today);

        //Initialize the api response model
        ForecastComparisonApiResponse apiResponse = new ForecastComparisonApiResponse();

        List<ForecastComparisonApiResponse.ForecastItem> forecastItems = new ArrayList<>();

        //Iterate through the list
        for (CurrencyForecast currencyForecast : currencyForecastList) {

            //Get the base currency for conversion
            String baseCurrency = currencyForecast.getBaseCurrency().getCurrencyCode();

            //Get the forecast currency for conversion
            String forecastCurrency = currencyForecast.getForecastCurrency().getCurrencyCode();

            //Fetches the conversion response from the service
            ConversionApiResponse conversionApiResponse = conversionService.getConversion(baseCurrency, forecastCurrency, 1.0, localDateToday);

            //Fetch the conversion rate for today
            double conversionRate = conversionApiResponse.getInfo().getRate();

            //Create a new ForecastItem and set the conversionRate and forecastData
            ForecastComparisonApiResponse.ForecastItem forecastItem = new ForecastComparisonApiResponse.ForecastItem();
            forecastItem.setConversionRate(conversionRate);
            forecastItem.setForecastData(currencyForecast);

            //Add the ForecastItem to the list
            forecastItems.add(forecastItem);
        }

        // Set the list in the API response
        apiResponse.setForecastComparisons(forecastItems);

        // Set success to true
        apiResponse.setSuccess(true);

        // Return the populated API response
        return apiResponse;
    }

    private double getForecastForCurrency(
            String method, String baseCurrency,
            String forecastCurrency, LocalDate startDate,
            LocalDate endDate) {


        //Create the Forecast Request Body for the currency
        ForecastRequestBody forecastRequestBody = new ForecastRequestBody();
        forecastRequestBody.setMethod(method);
        forecastRequestBody.setBaseCurrency(baseCurrency);
        forecastRequestBody.setForecastCurrency(forecastCurrency);
        forecastRequestBody.setStartDate(startDate);
        forecastRequestBody.setEndDate(endDate);

        //Calculate forecast
        return switch (method) {
            case "sma" ->
                    getRateFromForecast(forecastService.getForecastFromSimpleMovingAverage(forecastRequestBody), forecastRequestBody);
            case "ema" ->
                    getRateFromForecast(forecastService.getForecastFromExponentialMovingAverage(forecastRequestBody), forecastRequestBody);
            case "lsm" ->
                    getRateFromForecast(forecastService.getForecastFromLeastSquare(forecastRequestBody), forecastRequestBody);
            default ->
                    getRateFromForecast(forecastService.getForecastFromSimpleMovingAverage(forecastRequestBody), forecastRequestBody);
        };
    }

    private double getRateFromForecast(ForecastApiResponse forecastApiResponse, ForecastRequestBody forecastRequestBody) {
        //Get the rate
        double rate = 0.0;

        //get the start date from the request body
        String endDate = forecastRequestBody.getEndDate().toString();

        //check if the rates map contains the end date
        if (forecastApiResponse.getRates().containsKey(endDate)) {
            //get the inner map for the start date
            Map<String, Double> currencyRates = forecastApiResponse.getRates().get(endDate);

            //check if the inner map contains the forecast currency
            if (currencyRates.containsKey(forecastRequestBody.getForecastCurrency())) {
                //gets the rate for the forecast currency
                rate = currencyRates.get(forecastRequestBody.getForecastCurrency());
            }
        }

        return rate;
    }


    private double getRateFromConversion(ConversionApiResponse conversionApiResponse) {
        //Get the rate
        double rate = 0.0;

        //Gets rate from the conversion api response
        rate = conversionApiResponse.getInfo().getRate();

        return rate;
    }

}
