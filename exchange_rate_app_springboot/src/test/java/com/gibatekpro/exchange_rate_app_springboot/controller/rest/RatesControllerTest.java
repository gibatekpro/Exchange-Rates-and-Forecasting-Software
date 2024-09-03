package com.gibatekpro.exchange_rate_app_springboot.controller.rest;

import com.gibatekpro.exchange_rate_app_springboot.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class RatesControllerTest extends IntegrationTest {

    @Test
    void getRateApi() throws Exception {
        mockMvc.perform(get("/api/v1/rates/latest")
                        .param("base", "USD"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.base", instanceOf(String.class)));
    }

    @Test
    void getConversion() throws Exception {
        mockMvc.perform(get("/api/v1/rates/convert")
                        .param("from", "USD")
                        .param("to", "GBP")
                        .param("amount", "100")
                        .param("date", "2024-08-22"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.result", instanceOf(Double.class)));
    }

    @Test
    void getCurrencyList() throws Exception {
        mockMvc.perform(get("/api/v1/rates/currency-list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.symbols", notNullValue()));
    }

    @Test
    void getTimeSeries() throws Exception {
        mockMvc.perform(get("/api/v1/rates/time-series")
                        .param("from", "USD")
                        .param("to", "GBP")
                        .param("startDate", "2024-08-12")
                        .param("endDate", "2024-08-21"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.timeseries", is(true)))
                .andExpect(jsonPath("$.base", instanceOf(String.class)))
                .andExpect(jsonPath("$.to", instanceOf(String.class)));
    }


}