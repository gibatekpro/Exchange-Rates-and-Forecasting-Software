package com.gibatekpro.exchange_rate_app_springboot.repo;

import com.gibatekpro.exchange_rate_app_springboot.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CurrencyRepo extends CrudRepository<Currency, Long> {

    @Query("SELECT bc FROM Currency bc LEFT JOIN FETCH bc.baseCurrencyConversions cc LEFT JOIN FETCH cc.toCurrency WHERE bc.currencyCode = :currencyCode")
    Optional<Currency> findByCurrencyCode(String currencyCode);

}

