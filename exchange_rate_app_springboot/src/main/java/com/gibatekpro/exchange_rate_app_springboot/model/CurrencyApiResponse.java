package com.gibatekpro.exchange_rate_app_springboot.model;

import lombok.Data;

import java.util.Map;

@Data
public class CurrencyApiResponse {
    private boolean success;
    private Map<String, String> symbols;
}
