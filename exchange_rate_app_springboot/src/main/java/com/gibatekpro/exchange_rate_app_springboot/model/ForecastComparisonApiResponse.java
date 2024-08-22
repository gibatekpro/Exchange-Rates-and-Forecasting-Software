package com.gibatekpro.exchange_rate_app_springboot.model;

import com.gibatekpro.exchange_rate_app_springboot.entity.CurrencyForecast;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ForecastComparisonApiResponse {

    private boolean success;

    List<ForecastItem> forecastComparisons;


    @Data
    public static class ForecastItem{

        private double conversionRate;

        private CurrencyForecast forecastData;

    }

}
