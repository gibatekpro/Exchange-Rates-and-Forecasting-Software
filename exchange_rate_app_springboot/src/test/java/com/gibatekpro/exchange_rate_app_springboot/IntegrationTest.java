package com.gibatekpro.exchange_rate_app_springboot;

import com.gibatekpro.exchange_rate_app_springboot.config.app.ApplicationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.is;

@AutoConfigureMockMvc
@SpringBootTest
@ActiveProfiles("test")
@Import({TestConfig.class})
//@ComponentScan(basePackages = "com.gibatekpro.exchange_rate_app_springboot")
public abstract class IntegrationTest {
    @Autowired
    protected MockMvc mockMvc;
}
