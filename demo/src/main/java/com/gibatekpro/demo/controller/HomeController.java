package com.gibatekpro.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.logging.Logger;

@Controller
public class HomeController {

    private Logger logger = Logger.getLogger(HomeController.class.getName());

    @GetMapping("/")
    public String home() {

        logger.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>"+"Home page");

        return "helloworld";

    }


}
