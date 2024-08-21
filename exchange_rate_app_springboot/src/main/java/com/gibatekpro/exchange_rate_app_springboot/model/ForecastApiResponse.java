package com.gibatekpro.exchange_rate_app_springboot.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
public class ForecastApiResponse {

    private boolean success;

    @JsonProperty("timeseries")
    private boolean timeSeries;

    @JsonProperty("start_date")
    private String startDate;

    @JsonProperty("end_date")
    private String endDate;

    private String baseCurrency;

    private String forecastCurrency;

    private Map<String, Map<String, Double>> rates;

}
