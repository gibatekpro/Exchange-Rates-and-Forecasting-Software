package com.gibatekpro.exchange_rate_app_springboot.repo;

import com.gibatekpro.exchange_rate_app_springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 9. From {@link User} Extend JpaRepository
 * 10. create the findByEmail. Use Optional in case null is returned
 * 11. Create jwt authentication filter {@link } TODO: add link
 * */

public interface UserRepo extends JpaRepository<User, Integer> {

    //Optional in case null is returned
    Optional<User> findUserByEmail(String email);
    Optional<User> findUserByUid(String uid);

}
