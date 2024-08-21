package com.gibatekpro.exchange_rate_app_springboot.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ForecastRequestBody {

    private String method;

    private String baseCurrency;

    private String forecastCurrency;

    private LocalDate startDate;

    private LocalDate endDate;


}
