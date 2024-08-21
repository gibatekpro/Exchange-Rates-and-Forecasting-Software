package com.gibatekpro.exchange_rate_app_springboot.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.util.Map;

@Data
@JsonPropertyOrder({
        "success",
        "timeSeries",
        "startDate",
        "endDate",
        "base",
        "to",
        "rates"
})
public class TimeSeriesApiResponse {

    private boolean success;

    @JsonProperty("timeseries")
    private boolean timeSeries;

    @JsonProperty("start_date")
    private String startDate;

    @JsonProperty("end_date")
    private String endDate;

    private String base;

    private String to;

    private Map<String, Map<String, Double>> rates;

    @Override
    public String toString() {
        return "TimeSeriesApiResponse{" +
                "success=" + success +
                ", timeSeries=" + timeSeries +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", base='" + base + '\'' +
                ", to='" + to + '\'' +
                ", rates=" + rates +
                '}';
    }

}
