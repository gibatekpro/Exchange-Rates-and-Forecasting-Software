package com.gibatekpro.exchange_rate_app_springboot.model;

import lombok.Data;

@Data
public class ConversionApiResponse {
    private boolean success;
    private Query query;
    private Info info;
    private String date;
    private boolean historical;
    private double result;

    @Data
    public static class Query {
        private String from;
        private String to;
        private double amount;
    }

    @Data
    public static class Info {
        private long timestamp;
        private double rate;
    }
}
