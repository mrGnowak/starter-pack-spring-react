package com.starterpack.react.spring.starterpack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.starterpack.react.spring.starterpack.security.ConfirmationToken;

@Repository("confirmationTokenRepository")
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {

    ConfirmationToken findByConfirmationToken(String confirmationToken);

    ConfirmationToken findByAppUserUserId(Long userId);

    ConfirmationToken deleteByTokenId(Long tokenId);

    Boolean existsByAppUserUserId(Long userId);

}
