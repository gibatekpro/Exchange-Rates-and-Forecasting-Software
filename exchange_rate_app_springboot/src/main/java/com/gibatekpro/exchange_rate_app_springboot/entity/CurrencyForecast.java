package com.gibatekpro.exchange_rate_app_springboot.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "currency_forecast")
public class CurrencyForecast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "base_currency_id", nullable = false)
    @JsonManagedReference
    private Currency baseCurrency;

    @ManyToOne
    @JoinColumn(name = "forecast_currency_id", nullable = false)
    @JsonManagedReference
    private Currency forecastCurrency;

    @Column(name = "conversion_date", nullable = false)
    private Date conversionDate;

    @Column(name = "forecast_date", nullable = false)
    private Date forecastDate;

    @Column(name = "actual_rate", nullable = false)
    private Double actualRate;

    @Column(name = "sma_rate", nullable = false)
    private Double smaRate;

    @Column(name = "lsm_rate", nullable = false)
    private Double lsmRate;

    @Column(name = "ema_rate", nullable = false)
    private Double emaRate;

    // equals method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CurrencyForecast that = (CurrencyForecast) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(baseCurrency, that.baseCurrency) &&
                Objects.equals(forecastCurrency, that.forecastCurrency) &&
                Objects.equals(conversionDate, that.conversionDate) &&
                Objects.equals(forecastDate, that.forecastDate) &&
                Objects.equals(actualRate, that.actualRate) &&
                Objects.equals(smaRate, that.smaRate) &&
                Objects.equals(emaRate, that.emaRate);
    }

    // hashCode method
    @Override
    public int hashCode() {
        return Objects.hash(id, baseCurrency, forecastCurrency, conversionDate, forecastDate, actualRate, smaRate, emaRate);
    }

    // toString method
    @Override
    public String toString() {
        return "CurrencyForecast{" +
                "id=" + id +
                ", baseCurrency=" + baseCurrency +
                ", forecastCurrency=" + forecastCurrency +
                ", conversionDate=" + conversionDate +
                ", forecastDate=" + forecastDate +
                ", actualRate=" + actualRate +
                ", smaRate=" + smaRate +
                ", emaRate=" + emaRate +
                '}';
    }

}
