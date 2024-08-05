package com.gibatekpro.exchange_rate_app_springboot.config.app;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
public class ExternalApiConfig {

    @Value("${external.base-url}")
    private String baseUrl;

    @Value("${external.access-key}")
    private String accessKey;

    public String getSymbolsApiUrl() {
        return baseUrl + "/symbols?access_key=" + accessKey;
    }

    public String getGetRateApiUrl(String baseCurrency) {
        return String.format("%s/latest?access_key=%s&base=%s", baseUrl, accessKey, baseCurrency);
    }

    //Method to get conversion API URL
    public String getConversionApiUrl(String from, String to, double amount, String date) {
        return String.format("%s/convert?access_key=%s&from=%s&to=%s&amount=%f&date=%s", baseUrl, accessKey, from, to, amount, date);
    }

}
