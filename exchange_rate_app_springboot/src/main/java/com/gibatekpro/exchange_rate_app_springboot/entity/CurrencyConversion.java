package com.gibatekpro.exchange_rate_app_springboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "currency_conversion")
public class CurrencyConversion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "base_currency_id", nullable = false)
    private Currency baseCurrency;

    @ManyToOne
    @JoinColumn(name = "to_currency_id", nullable = false)
    private Currency toCurrency;

    @Column(name = "conversion_date", nullable = false)
    private Date conversionDate;

    @Column(name = "rate", nullable = false)
    private Double rate;

    @Override
    public int hashCode() {
        return Objects.hash(id, baseCurrency, toCurrency, conversionDate, rate);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        CurrencyConversion that = (CurrencyConversion) obj;
        return Objects.equals(id, that.id) &&
                Objects.equals(baseCurrency, that.baseCurrency) &&
                Objects.equals(toCurrency, that.toCurrency) &&
                Objects.equals(conversionDate, that.conversionDate) &&
                Objects.equals(rate, that.rate);
    }
}