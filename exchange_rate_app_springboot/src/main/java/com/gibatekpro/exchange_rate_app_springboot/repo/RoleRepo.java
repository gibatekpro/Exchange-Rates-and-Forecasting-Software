package com.gibatekpro.exchange_rate_app_springboot.repo;

import com.gibatekpro.exchange_rate_app_springboot.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {

    Optional<Role> findById(int id);

    Optional<Role> findByName(String role);

}
