package com.starterpack.react.spring.starterpack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.starterpack.react.spring.starterpack.model.AppUser;

public interface UsersRepo extends JpaRepository<AppUser, Long> {

    AppUser findByEmail(String email);

    AppUser findByUserName(String userName);
}
