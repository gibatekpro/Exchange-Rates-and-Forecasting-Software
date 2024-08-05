package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.entity.Currency;
import com.gibatekpro.exchange_rate_app_springboot.model.CurrencyApiResponse;
import com.gibatekpro.exchange_rate_app_springboot.repo.CurrencyRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
public class CurrencyListServiceImpl implements CurrencyListService{

    private final CurrencyRepo currencyRepo;

    @Override
    public CurrencyApiResponse fetchAllCurrencies() {

        CurrencyApiResponse currencyApiResponse = new CurrencyApiResponse();

        Iterable<Currency> currencies = currencyRepo.findAll();


        //Create a map to hold currency symbols
        Map<String, String> symbols = new TreeMap<>();

        //Iterate over the fetched currencies
        for (Currency currency : currencies) {
            //Populate the map with currency code and currency name
            symbols.put(currency.getCurrencyCode(), currency.getCurrencyName());
        }

        //Set the success flag to true
        currencyApiResponse.setSuccess(true);

        //Set the symbols map in the response
        currencyApiResponse.setSymbols(symbols);

        //Return the populated CurrencyApiResponse object
        return currencyApiResponse;
    }

}
