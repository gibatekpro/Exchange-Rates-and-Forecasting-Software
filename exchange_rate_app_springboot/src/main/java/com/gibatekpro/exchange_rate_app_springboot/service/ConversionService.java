package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.model.ConversionApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.LatestRateApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.model.TimeSeriesApiResponse;

import java.time.LocalDate;
import java.util.Optional;


public interface ConversionService {

    Optional<LatestRateApiResponse> getLatestRatesByBaseCurrency(String base);

    ConversionApiResponse getConversion(String from, String to, double amount, LocalDate date);

    TimeSeriesApiResponse fetchTimeSeriesConversion(String from, String to, LocalDate startDate, LocalDate endDate);
}