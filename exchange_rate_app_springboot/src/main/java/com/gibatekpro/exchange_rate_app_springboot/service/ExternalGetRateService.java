package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.config.app.ExternalApiConfig;
import com.gibatekpro.exchange_rate_app_springboot.entity.Currency;
import com.gibatekpro.exchange_rate_app_springboot.entity.CurrencyConversion;
import com.gibatekpro.exchange_rate_app_springboot.model.LatestRateApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.CurrencyApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyRepo;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyConversionRepo;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.checkerframework.common.returnsreceiver.qual.This;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.Map;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class ExternalGetRateService {

    private final CurrencyRepo currencyRepository;
    private final CurrencyRepo toCurrencyRepository;
    private final CurrencyConversionRepo currencyConversionRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    private final ExternalApiConfig externalApiConfig;

    private final Logger logger = Logger.getLogger(getClass().getName());

    //This method will be called immediately after the server starts TODO:
    @PostConstruct
    @Transactional
    public void init() {
        logger.info("Initializing GetRateService");
        fetchAndSaveCurrencies();
    }


//    @Scheduled(fixedRate = 3600000) // Every hour
//    @Transactional
//    public void updateExchangeRates() {
//        logger.info("====================" + "updateExchangeRates");
//
//
//        long startTime = System.currentTimeMillis(); // Timer start
//        for (Currency base : currencyRepository.findAll()) {
//            fetchAndSaveRates(base.getCurrencyCode());
//        }
//        logger.info("==================== updateExchangeRates - End");
//
//        long endTime = System.currentTimeMillis(); // Timer end
//        long duration = endTime - startTime;
//        double durationInMinutes = duration / 60000.0; // Convert milliseconds to minutes
//
//        logger.info("==================== updateExchangeRates - End");
//        logger.info("Total execution time: " + durationInMinutes + " minutes");
//    }


//    @Scheduled(fixedRate = 60000) // Every 5 minutes
//    @Transactional
//    public void updateExchangeRates() {
//        logger.info("==================== updateExchangeRates - Start");
//
//        long startTime = System.currentTimeMillis(); // Timer start
//
//        currencyRepository.findAll().stream().findFirst().ifPresent(base -> {
//            logger.info("Fetching and saving rates for: " + base.getCurrencyCode());
//            fetchAndSaveRates(base.getCurrencyCode());
//        });
//
//        long endTime = System.currentTimeMillis(); // Timer end
//        long duration = endTime - startTime;
//        double durationInMinutes = duration / 60000.0; // Convert milliseconds to minutes
//
//        logger.info("==================== updateExchangeRates - End");
//        logger.info("Total execution time: " + durationInMinutes + " minutes");
//    }

    @Transactional
    public void fetchAndSaveCurrencies() {
        //Fetches Currencies using external API Url
        String url = externalApiConfig.getSymbolsApiUrl();
        CurrencyApiResponse response = restTemplate.getForObject(url, CurrencyApiResponse.class);

        if (response != null && response.isSuccess()) {
            for (Map.Entry<String, String> entry : response.getSymbols().entrySet()) {

                //Saves the currency on the currency table
                Currency currency = currencyRepository.findByCurrencyCode(entry.getKey())
                        .orElse(new Currency());

                currency.setCurrencyCode(entry.getKey());
                currency.setCurrencyName(entry.getValue());
                currencyRepository.save(currency);
            }
        }
    }

    @Transactional
    public void fetchAndSaveRates(String baseCurrencyCode) {
        logger.info("Fetching and saving rates for: " + baseCurrencyCode);
        String url = externalApiConfig.getGetRateApiUrl(baseCurrencyCode);
        LatestRateApiResponse response = restTemplate.getForObject(url, LatestRateApiResponse.class);

        if (response != null && response.isSuccess()) {
            Currency currency = currencyRepository.findByCurrencyCode(baseCurrencyCode)
                    .orElseThrow(() -> new RuntimeException("Base currency not found: " + baseCurrencyCode));

            for (Map.Entry<String, Double> entry : response.getRates().entrySet()) {
                Currency toCurrency = toCurrencyRepository.findByCurrencyCode(entry.getKey())
                        .orElseThrow(() -> new RuntimeException("To currency not found: " + entry.getKey()));

                CurrencyConversion conversion = new CurrencyConversion();
                conversion.setBaseCurrency(currency);
                conversion.setToCurrency(toCurrency);
                conversion.setConversionDate(new Date());
                conversion.setRate(entry.getValue());
                currencyConversionRepository.save(conversion);
            }


            logger.info("Finished fetching and saving rates for: " + baseCurrencyCode);
        }
    }
}