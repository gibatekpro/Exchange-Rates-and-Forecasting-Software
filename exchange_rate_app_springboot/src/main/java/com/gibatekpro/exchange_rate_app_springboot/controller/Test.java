package com.gibatekpro.exchange_rate_app_springboot.controller;

import com.google.firebase.FirebaseApp;
import org.apache.http.annotation.Contract;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("api/test")
public class Test {

    @GetMapping("/tester")
    public String tester(){
        return "tester";
    }

    @GetMapping("/testerB")
    public String testerB(){
        return "tester";
    }

}
