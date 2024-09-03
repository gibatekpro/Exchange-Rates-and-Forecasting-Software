package com.gibatekpro.exchange_rate_app_springboot.controller.rest;

import com.gibatekpro.exchange_rate_app_springboot.model.RegisterRequestBody;
import com.gibatekpro.exchange_rate_app_springboot.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;


@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final Logger logger = Logger.getLogger(getClass().getName());

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestBody requestBody) {

        logger.info(requestBody.toString());

        authService.register(requestBody);
        return ResponseEntity.ok("User registered successfully");
    }

}
