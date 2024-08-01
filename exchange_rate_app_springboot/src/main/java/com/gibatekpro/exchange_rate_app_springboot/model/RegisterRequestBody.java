package com.gibatekpro.exchange_rate_app_springboot.model;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterRequestBody {

    private String firstName;

    private String lastName;

    private String email;

    private String uid;

}
