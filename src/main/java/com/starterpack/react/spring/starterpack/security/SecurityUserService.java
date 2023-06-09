package com.starterpack.react.spring.starterpack.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.starterpack.react.spring.starterpack.repository.UsersRepo;

public class SecurityUserService implements UserDetailsService {

    @Autowired
    private UsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user = usersRepo.findByEmailIgnoreCase(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not present");
        }
        return new SecurityUser() {
            {
                setId(user.getUserId());
                setAuthorities(List.of(() -> "read"));
                setPassword(user.getHash());
                setUsername(user.getEmail());
                setAccountNonExpired(true);
                setAccountNonLocked(true);
                setCredentialsNonExpired(true);
                setEnabled(true);
            }
        };

    }

}