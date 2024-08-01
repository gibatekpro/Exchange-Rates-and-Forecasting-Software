package com.gibatekpro.exchange_rate_app_springboot.service;

import com.gibatekpro.exchange_rate_app_springboot.entity.Role;
import com.gibatekpro.exchange_rate_app_springboot.entity.User;
import com.gibatekpro.exchange_rate_app_springboot.model.RegisterRequestBody;
import com.gibatekpro.exchange_rate_app_springboot.repo.RoleRepo;
import com.gibatekpro.exchange_rate_app_springboot.repo.UserRepo;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final Logger logger = Logger.getLogger(getClass().getName());

    private final RoleRepo roleRepo;

    private final UserRepo userRepo;

    private final AuthenticationManager authenticationManager;

    @Override
    public void register(RegisterRequestBody requestBody) {
        logger.info("register");
        var user = User.builder()
                .firstName(requestBody.getFirstName())
                .lastName(requestBody.getLastName())
                .email(requestBody.getEmail())
                .uid(requestBody.getUid())
                .build(); //TODO: Roles

        Collection<Role> roles = new ArrayList<>();

        try {
            Role role = roleRepo.findByName("ROLE_USER")
                    .orElseThrow();

            roles.add(role);

            user.setRoles(roles);

            userRepo.save(user);
        } catch (Exception e) {
            logger.warning(" ==== " + e.getMessage() + " ==== ");
            throw new RuntimeException(e);
        }
    }

}
