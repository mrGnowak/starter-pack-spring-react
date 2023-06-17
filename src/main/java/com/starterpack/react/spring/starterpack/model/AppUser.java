package com.starterpack.react.spring.starterpack.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.starterpack.react.spring.starterpack.security.ConfirmationToken;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class AppUser {

    @Id
    @GeneratedValue
    private Long userId;
    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;
    @Column
    private String email;
    @Column
    private String hash;
    @Column
    private String salt;
    @Column
    private String chain;
    @Column
    private boolean emailConfirmed;

    @OneToOne(mappedBy = "appUser")
    private ConfirmationToken confirmationToken;

}
