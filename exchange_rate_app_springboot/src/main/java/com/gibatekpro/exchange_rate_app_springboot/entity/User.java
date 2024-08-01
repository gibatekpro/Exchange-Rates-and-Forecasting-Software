package com.gibatekpro.exchange_rate_app_springboot.entity;

import com.gibatekpro.exchange_rate_app_springboot.repo.UserRepo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 *  1. Create this User entity
 *  2. Create {@link Role} Entity
 *  4. Create a joinTable for User and Role
 *  5. Implement the {@link UserDetails} interface to make this user
 *      a spring user
 *  6. Implement the methods. Map the roles to the granted authorities
 *  7. Change the false values to true
 *  8. Create {@link UserRepo}
 * */

@Data// Lombok for generating getters and setters
@Builder// Lombok for generating Builder design pattern
@NoArgsConstructor// Lombok for generating default constructor
@AllArgsConstructor// Lombok for generating constructor with all class properties
@Entity
@Table(name = "_user")
public class User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "uid")
    private String uid;


    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.REFRESH})
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Role> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return uid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
