package com.gibatekpro.exchange_rate_app_springboot.model;

import lombok.Data;

import java.util.Map;

@Data
public class LatestRateApiResponse {

    private boolean success;
    private long timestamp;
    private String base;
    private String date;
    private Map<String, Double> rates;

}
