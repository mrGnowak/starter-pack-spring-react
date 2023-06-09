package com.starterpack.react.spring.starterpack.security;

import java.util.UUID;

import com.github.f4b6a3.uuid.UuidCreator;

public class Chain {
    public String STARTING_CHAIN = "0";

    public String generateNextChain() {
        UUID uuid = UuidCreator.getTimeBased();
        return uuid.toString();
    }

}
