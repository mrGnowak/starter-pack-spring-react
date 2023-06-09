package com.starterpack.react.spring.starterpack.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class AppUser {

    @Id
    @GeneratedValue
    private Long userId;
    @Column
    private String createdAt;
    @Column
    private String email;
    @Column
    private String hash;
    @Column
    private String salt;
    @Column
    private String chain;

}
