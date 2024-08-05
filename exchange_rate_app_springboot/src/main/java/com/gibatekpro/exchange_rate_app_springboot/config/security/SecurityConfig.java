package com.gibatekpro.exchange_rate_app_springboot.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final RequestFilter requestFilter;
        private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(requests -> requests
                .requestMatchers("/api/test/tester",
                        "/api/test/testerB",
                        "/api/v1/auth/register",
                        "/api/v1/auth/tester",
                        "/api/v1/rates/latest",
                        "/api/v1/rates/convert",
                        "/api/v1/rates/currency-list",
                        "/api/v1/rates/time-series"
                )// WhiteList requests
                .permitAll()// Permit white-list requests
                .requestMatchers("/api/test/testerC")
                .authenticated())//Authenticate others
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        http
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(requests -> requests
//                        .requestMatchers("/api/v1/auth/**","/api/v1/demo/hello")// WhiteList requests
//                        .permitAll()// Permit white-list requests
//                        .requestMatchers("/api/v1/demo/user")
//                        .hasRole("ADMIN")
//                        .anyRequest()
//                        .authenticated()//Authenticate others
//                )
//                .sessionManagement((sessionManagement) ->
//                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authenticationProvider(authenticationProvider)
//                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }


}
