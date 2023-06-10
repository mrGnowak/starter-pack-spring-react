package com.starterpack.react.spring.starterpack.security;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.github.f4b6a3.uuid.UuidCreator;

@Component
public class Chain {
    public String STARTING_CHAIN = "0";

    public String generateNextChain() {
        UUID uuid = UuidCreator.getTimeOrdered();
        return uuid.toString();
    }

}
