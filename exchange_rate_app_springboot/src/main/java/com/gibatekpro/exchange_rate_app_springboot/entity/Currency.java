package com.gibatekpro.exchange_rate_app_springboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "currency")
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "currency_code", nullable = false)
    private String currencyCode;

    @Column(name = "currency_name", nullable = false)
    private String currencyName;

    //One-to-Many relationship with CurrencyConversion where this Currency is the base currency
    @OneToMany(mappedBy = "baseCurrency")
    private Set<CurrencyConversion> baseCurrencyConversions = new HashSet<>();

    //One-to-Many relationship with CurrencyConversion where this Currency is the to currency
    @OneToMany(mappedBy = "toCurrency")
    private Set<CurrencyConversion> toCurrencyConversions = new HashSet<>();

    @Override
    public int hashCode() {
        return Objects.hash(id, currencyCode, currencyName);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Currency that = (Currency) obj;
        return Objects.equals(id, that.id) &&
                Objects.equals(currencyCode, that.currencyCode) &&
                Objects.equals(currencyName, that.currencyName);
    }
}