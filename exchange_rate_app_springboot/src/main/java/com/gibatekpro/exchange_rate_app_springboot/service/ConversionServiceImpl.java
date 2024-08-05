package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.config.app.ExternalApiConfig;
import com.gibatekpro.exchange_rate_app_springboot.entity.Currency;
import com.gibatekpro.exchange_rate_app_springboot.entity.CurrencyConversion;
import com.gibatekpro.exchange_rate_app_springboot.model.ConversionApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.LatestRateApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.TimeSeriesApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyRepo;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyConversionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversionServiceImpl implements ConversionService {

    private final Logger logger = Logger.getLogger(ConversionServiceImpl.class.getName());

    private final CurrencyRepo currencyRepo;
    private final CurrencyRepo toCurrencyRepo;
    private final CurrencyConversionRepo currencyConversionRepo;
    private final ExternalApiConfig externalApiConfig;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public Optional<LatestRateApiResponse> getLatestRatesByBaseCurrency(String base) {
        Optional<Currency> baseCurrencyOpt = currencyRepo.findByCurrencyCode(base);

        if (baseCurrencyOpt.isPresent()) {
            Currency currency = baseCurrencyOpt.get();
            Map<String, Double> rates = currency.getBaseCurrencyConversions().stream()
                    .collect(Collectors.toMap(
                            conversion -> conversion.getToCurrency().getCurrencyCode(),
                            CurrencyConversion::getRate,
                            (existing, replacement) -> {
                                logger.warning("Duplicate key found: " + existing + ". Keeping existing value: " + replacement);
                                return existing;
                            },
                            LinkedHashMap::new
                    ));

            LatestRateApiResponse response = new LatestRateApiResponse();
            response.setSuccess(true);
            response.setTimestamp(System.currentTimeMillis());
            response.setBase(currency.getCurrencyCode());
            response.setDate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
            response.setRates(rates);

            return Optional.of(response);
        }

        return Optional.empty();
    }


    //The service method to get conversion rate and save it if not already present
    @Override
    @Transactional
    public ConversionApiResponse getConversion(String from, String to, double amount, LocalDate date) {
        //Fetches the base currency from the repository
        Currency baseCurrency = currencyRepo.findByCurrencyCode(from)
                .orElseThrow(() -> new RuntimeException("Base currency not found: " + from));

        //Fetches the to-currency from the repository
        Currency toCurrency = toCurrencyRepo.findByCurrencyCode(to)
                .orElseThrow(() -> new RuntimeException("To currency not found: " + to));

        Date conversionDate = Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());

        //Checks if the conversion rate already exists in the repository
        Optional<CurrencyConversion> existingConversion = currencyConversionRepo.findByBaseCurrencyAndToCurrencyAndConversionDate(baseCurrency, toCurrency, conversionDate);

        //If the conversion rate exists, return it
        if (existingConversion.isPresent()) {
            CurrencyConversion conversion = existingConversion.get();
            ConversionApiResponse response = new ConversionApiResponse();
            response.setSuccess(true);
            response.setDate(date.toString());
            //Normally returns for 1 unit of the currency and multiplying by the amount
            response.setResult(conversion.getRate() * amount);
            ConversionApiResponse.Query query = new ConversionApiResponse.Query();
            query.setFrom(from);
            query.setTo(to);
            query.setAmount(amount);
            response.setQuery(query);
            ConversionApiResponse.Info info = new ConversionApiResponse.Info();
            info.setTimestamp(conversion.getConversionDate().toInstant().getEpochSecond());
            info.setRate(conversion.getRate());
            response.setInfo(info);
            return response;
        } else {
            //If the conversion rate does not exist, fetch it from the external API
            String url = externalApiConfig.getConversionApiUrl(from, to, amount, date.toString());
            ConversionApiResponse response = restTemplate.getForObject(url, ConversionApiResponse.class);

            //If the response is successful, save the conversion rate in the repository
            if (response != null && response.isSuccess()) {
                CurrencyConversion conversion = new CurrencyConversion();
                conversion.setBaseCurrency(baseCurrency);
                conversion.setToCurrency(toCurrency);
                conversion.setConversionDate(conversionDate);
                conversion.setRate(response.getInfo().getRate());
                currencyConversionRepo.save(conversion);
            }

            //Returns the response from the external API
            return response;
        }
    }

    @Override
    @Transactional
    public TimeSeriesApiResponse fetchTimeSeriesConversion(String from, String to, LocalDate startDate, LocalDate endDate) {
        // Fetches the base currency from the repository
        Currency baseCurrency = currencyRepo.findByCurrencyCode(from)
                .orElseThrow(() -> new RuntimeException("Base currency not found: " + from));

        // Fetches the to-currency from the repository
        Currency toCurrency = toCurrencyRepo.findByCurrencyCode(to)
                .orElseThrow(() -> new RuntimeException("To currency not found: " + to));

        // Initialize the response object
        TimeSeriesApiResponse response = new TimeSeriesApiResponse();
        response.setSuccess(true);
        response.setTimeSeries(true);
        response.setStartDate(startDate.toString());
        response.setEndDate(endDate.toString());
        response.setBase(from);
        Map<String, Map<String, Double>> rates = new HashMap<>();

        // Loop through each date from start date to end date
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            // Fetch the conversion rate from the external API
            // Build the URL dynamically using the current context
            String url = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/v1/rates/convert")
                    .queryParam("from", from)
                    .queryParam("to", to)
                    .queryParam("amount", 1.0)
                    .queryParam("date", currentDate.toString())
                    .toUriString();

            ConversionApiResponse apiResponse = restTemplate.getForObject(url, ConversionApiResponse.class);

            if (apiResponse != null && apiResponse.isSuccess()) {
                rates.computeIfAbsent(currentDate.toString(), k -> new HashMap<>()).put(to, apiResponse.getInfo().getRate());
            }

            // Move to the next date
            currentDate = currentDate.plusDays(1);
        }

        response.setRates(rates);
        return response;
    }

}
