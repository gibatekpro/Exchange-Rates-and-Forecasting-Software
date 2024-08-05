package com.gibatekpro.exchange_rate_app_springboot.repo;

import com.gibatekpro.exchange_rate_app_springboot.entity.Currency;
import com.gibatekpro.exchange_rate_app_springboot.entity.CurrencyConversion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface CurrencyConversionRepo extends JpaRepository<CurrencyConversion, Long> {

    Optional<CurrencyConversion> findByBaseCurrencyAndToCurrencyAndConversionDate(
            Currency baseCurrency, Currency toCurrency, Date conversionDate);


}
