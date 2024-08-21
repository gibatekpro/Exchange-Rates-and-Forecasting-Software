package com.gibatekpro.exchange_rate_app_springboot.controller.rest;

import com.gibatekpro.exchange_rate_app_springboot.model.ForecastApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.ForecastRequestBody;
import com.gibatekpro.exchange_rate_app_springboot.service.ConversionServiceImpl;
import com.gibatekpro.exchange_rate_app_springboot.service.ForecastService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.logging.Logger;

@RestController()
@RequestMapping("api/v1/forecast")
@RequiredArgsConstructor
public class ForecastController {

    private final Logger logger = Logger.getLogger(ConversionServiceImpl.class.getName());
    private final ForecastService forecastService;

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

}
