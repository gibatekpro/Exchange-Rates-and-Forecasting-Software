package com.gibatekpro.exchange_rate_app_springboot.repo;

import com.gibatekpro.exchange_rate_app_springboot.entity.CurrencyForecast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface CurrencyForecastRepo extends JpaRepository<CurrencyForecast, Long> {

    //TODO: Change to findAllByForecastDate
    List<CurrencyForecast> findAllByForecastDate(Date forecastDate);

    Optional<CurrencyForecast> findFirstByConversionDate(Date today);

}
