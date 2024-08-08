package com.gibatekpro.exchange_rate_app_springboot.controller.rest;

import com.gibatekpro.exchange_rate_app_springboot.model.ConversionApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.CurrencyApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.LatestRateApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.TimeSeriesApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyRepo;
import com.gibatekpro.exchange_rate_app_springboot.service.ConversionService;
import com.gibatekpro.exchange_rate_app_springboot.service.CurrencyListService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.logging.Logger;
import java.util.Optional;

@RestController()
@RequestMapping("api/v1/rates")
@RequiredArgsConstructor
public class RatesController {

    private final Logger logger = Logger.getLogger(getClass().getName());

    private final ConversionService conversionService;
    private final CurrencyRepo currencyRepo;
    private final CurrencyListService currencyListService;

    @GetMapping("latest")
    public ResponseEntity<LatestRateApiResponse> getRateApi(@RequestParam String base) {
        logger.info("Getting rates for " + base);

        Optional<LatestRateApiResponse> response = conversionService.getLatestRatesByBaseCurrency(base);

        if (response.isPresent()) {
            return ResponseEntity.ok(response.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //This endpoint handles conversion requests
    @GetMapping("convert")
    public ResponseEntity<ConversionApiResponse> getConversion(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam double amount,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        //Logs the details of the conversion request
        logger.info("Converting " + amount + " from " + from + " to " + to + " on date " + date);

        //Fetches the conversion response from the service
        ConversionApiResponse response = conversionService.getConversion(from, to, amount, date);

        //Returns the response if found, otherwise returns 404
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //This endpoint handles fetching list of currencies requests
    @GetMapping("currency-list")
    public ResponseEntity<CurrencyApiResponse> getConversion() {

        //Logs the details of the currency list request
        logger.info("Getting currency list");

        //Fetches the currency list from the service
        CurrencyApiResponse response = currencyListService.fetchAllCurrencies();

        //Returns the response if found, otherwise returns 404
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //This endpoint handles fetching list of currencies requests
    @GetMapping("time-series")
    public ResponseEntity<TimeSeriesApiResponse> getTimeSeries(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {

        //Logs the details of the time series request
        logger.info("Getting time series data");

        //Fetches the time series from the service
        TimeSeriesApiResponse response = conversionService.fetchTimeSeriesConversion(from, to, startDate, endDate);

        //Returns the response if found, otherwise returns 404
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
