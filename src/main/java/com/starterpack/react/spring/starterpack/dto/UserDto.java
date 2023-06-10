package com.starterpack.react.spring.starterpack.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String email;
    private boolean emailConfirmed;
}
