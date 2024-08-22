package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.model.ForecastComparisonApiResponse;

public interface ForecastComparisonService {

    void calculateForecastComparison();

    ForecastComparisonApiResponse getForecastComparisonData();
}
