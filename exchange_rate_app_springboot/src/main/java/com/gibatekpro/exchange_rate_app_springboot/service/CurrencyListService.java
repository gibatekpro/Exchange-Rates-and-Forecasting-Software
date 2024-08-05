package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.entity.Currency;
import com.gibatekpro.exchange_rate_app_springboot.model.CurrencyApiResponse;

public interface CurrencyListService {

    CurrencyApiResponse fetchAllCurrencies();

}
