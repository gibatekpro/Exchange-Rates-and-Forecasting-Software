package com.gibatekpro.exchange_rate_app_springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ExchangeRateAppSpringbootApplication {

    public static void main(String[] args){
        SpringApplication.run(ExchangeRateAppSpringbootApplication.class, args);
    }

}
