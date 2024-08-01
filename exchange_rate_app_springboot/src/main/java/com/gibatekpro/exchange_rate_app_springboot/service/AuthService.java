package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.model.RegisterRequestBody;
import org.springframework.security.core.userdetails.UserDetails;


public interface AuthService {

    void register(RegisterRequestBody requestBody);

}
