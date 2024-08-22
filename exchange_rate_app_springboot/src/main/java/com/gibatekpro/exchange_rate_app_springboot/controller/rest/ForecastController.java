package com.gibatekpro.exchange_rate_app_springboot.controller.rest;

import com.gibatekpro.exchange_rate_app_springboot.entity.CurrencyForecast;
import com.gibatekpro.exchange_rate_app_springboot.model.ForecastApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.ForecastComparisonApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.ForecastRequestBody;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyForecastRepo;
import com.gibatekpro.exchange_rate_app_springboot.service.ConversionServiceImpl;
import com.gibatekpro.exchange_rate_app_springboot.service.ForecastComparisonService;
import com.gibatekpro.exchange_rate_app_springboot.service.ForecastService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;
import java.util.logging.Logger;

@RestController()
@RequestMapping("api/v1/forecast")
@RequiredArgsConstructor
public class ForecastController {

    private final Logger logger = Logger.getLogger(ConversionServiceImpl.class.getName());
    private final ForecastService forecastService;
    private final CurrencyForecastRepo currencyForecastRepo;
    private final ForecastComparisonService forecastComparisonService;

    //This endpoint handles fetching forecast data
    @GetMapping("data")
    public ResponseEntity<ForecastApiResponse> getForecastData(
            @RequestParam String method,
            @RequestParam String baseCurrency,
            @RequestParam String forecastCurrency,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        //Logs the details of the forecast request
        logger.info("Getting forecast data");

        //Creates a ForecastRequestBody object from the request parameters
        ForecastRequestBody forecastRequestBody = new ForecastRequestBody();
        forecastRequestBody.setMethod(method);
        forecastRequestBody.setBaseCurrency(baseCurrency);
        forecastRequestBody.setForecastCurrency(forecastCurrency);
        forecastRequestBody.setStartDate(startDate);
        forecastRequestBody.setEndDate(endDate);

        //Fetches the data
        ForecastApiResponse response;
        switch (method){

            case "ema":
                response = forecastService.getForecastFromExponentialMovingAverage(forecastRequestBody);
                break;
            case "sma":
                response = forecastService.getForecastFromSimpleMovingAverage(forecastRequestBody);
                break;
            case "lsm":
                response = forecastService.getForecastFromLeastSquare(forecastRequestBody);
                break;
            default:
                response = forecastService.getForecastFromExponentialMovingAverage(forecastRequestBody);


        }

        //Returns the response if found, otherwise returns 404
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //This endpoint handles fetching forecast comparison data
    @GetMapping("comparison-data")
    public synchronized ResponseEntity<ForecastComparisonApiResponse> getComparisonData() {

        //Logs the details of the forecast comparison request
        logger.info("Getting forecast comparison data");

        //Get today's date as LocalDate
        LocalDate localDate = LocalDate.now();

        //Convert to Date
        Date today = Date.from(localDate.atStartOfDay(ZoneId.of("UTC")).toInstant());

        //First update Forecast for the day
        Optional<CurrencyForecast> optionalCurrencyForecast = currencyForecastRepo.findFirstByConversionDate(today);

        //Initialize response
        ForecastComparisonApiResponse response = new ForecastComparisonApiResponse();

        if (optionalCurrencyForecast.isPresent()) {

            //Get comparison
            response = forecastComparisonService.getForecastComparisonData();

        }else {

            //Logs the details of the forecast request
            logger.info("Getting forecast data");

            //Update database
            forecastComparisonService.calculateForecastComparison();

            //getComparison
            response = forecastComparisonService.getForecastComparisonData();

        }


        //Returns the response if found, otherwise returns 404
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //This endpoint handles fetching forecast data
    @PostMapping("for")
    public void postForecastData() {

        //Logs the details of the forecast request
        logger.info("Getting forecast data");

        forecastComparisonService.calculateForecastComparison();

    }

}
