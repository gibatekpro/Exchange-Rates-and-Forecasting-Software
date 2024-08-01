package com.gibatekpro.exchange_rate_app_springboot.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data// Lombok for generating getters and setters
@Builder// Lombok for generating Builder design pattern
@NoArgsConstructor// Lombok for generating default constructor
@AllArgsConstructor// Lombok for generating constructor with all class properties
@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    String name;

}
