package com.starterpack.react.spring.starterpack.service;

import java.time.LocalDate;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.starterpack.react.spring.starterpack.dto.LoginUserDto;
import com.starterpack.react.spring.starterpack.model.AppUser;
import com.starterpack.react.spring.starterpack.repository.ConfirmationTokenRepository;
import com.starterpack.react.spring.starterpack.repository.UsersRepo;
import com.starterpack.react.spring.starterpack.security.Chain;
import com.starterpack.react.spring.starterpack.security.ConfirmationToken;

@Component
public class UserService {

    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private PasswordEncoder globalPasswordEncoder;

    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    Chain chain;

    public ResponseEntity<String> saveNewUser(LoginUserDto loginUserDto) {

        AppUser appUser = new AppUser();
        if (usersRepo.existsByEmail(loginUserDto.getEmail())) {
            System.out.println("This email is already in use!");
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        LocalDate localDate = LocalDate.now();

        String hashPass = globalPasswordEncoder.encode(loginUserDto.getPassword());
        appUser.setHash(hashPass);
        appUser.setChain("0");
        appUser.setEmail(loginUserDto.getEmail());
        appUser.setCreatedAt(localDate.toString());
        usersRepo.save(appUser);

        ConfirmationToken confirmationToken = new ConfirmationToken(appUser);
        confirmationTokenRepository.save(confirmationToken);

        sendVerificationEmail(loginUserDto.getEmail(), confirmationToken.getConfirmationToken());
        System.out.println("Created!");
        return ResponseEntity.ok("Verify email by the link sent on your email address");

    }

    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (token != null) {
            AppUser user = usersRepo.findByEmailIgnoreCase(token.getUserEntity().getEmail());
            user.setChain(chain.generateNextChain());
            System.out.println(chain.generateNextChain());
            usersRepo.save(user);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }

    public boolean checkPasswordMatches(String password, String hashPassword) {
        boolean isPasswordMatches = globalPasswordEncoder.matches(password, hashPassword);
        return isPasswordMatches;
    }

    public Long returnLoggedUserId(String email, String password) {
        var user = usersRepo.findByEmailIgnoreCase(email);
        if (user == null) {
            return null;
        } else {
            var checkPass = checkPasswordMatches(password, user.getHash());
            if (checkPass) {
                return user.getUserId();
            }
        }
        return null;

    }

    public AppUser getUserById(Long userId) {
        var user = usersRepo.findById(userId);
        return user.isPresent() ? user.get() : null;
    }

    public void updateUser(AppUser appUser) {
        var userId = appUser.getUserId();
        var newUser = usersRepo.findById(userId).get();
        newUser.setHash(globalPasswordEncoder.encode(appUser.getHash()));
        usersRepo.save(newUser);

    }

    public void sendVerificationEmail(String email, String token) {
        emailSender.sendEmail(email, "Confirm account",
                "Click on the link to confirm account! " + "http://localhost:8080/api/auth/confirm-account?token="
                        + token);
    }

}
