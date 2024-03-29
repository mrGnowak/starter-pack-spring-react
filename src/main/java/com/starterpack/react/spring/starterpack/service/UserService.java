package com.starterpack.react.spring.starterpack.service;

import java.util.Calendar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.starterpack.react.spring.starterpack.dto.LoginUserDto;
import com.starterpack.react.spring.starterpack.model.AppUser;
import com.starterpack.react.spring.starterpack.repository.ConfirmationTokenRepository;
import com.starterpack.react.spring.starterpack.repository.UsersRepo;
import com.starterpack.react.spring.starterpack.security.Chain;
import com.starterpack.react.spring.starterpack.security.ConfirmationToken;

@Service
public class UserService {

    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private PasswordEncoder globalPasswordEncoder;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private Chain chain;

    public ResponseEntity<String> saveNewUser(LoginUserDto loginUserDto) {

        AppUser appUser = new AppUser();
        if (usersRepo.existsByEmail(loginUserDto.getEmail())) {
            System.out.println("This email is already in use!");
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        String hashPass = globalPasswordEncoder.encode(loginUserDto.getPassword());
        appUser.setHash(hashPass);
        appUser.setChain(chain.STARTING_CHAIN);
        appUser.setEmailConfirmed(false);
        appUser.setEmail(loginUserDto.getEmail());
        usersRepo.save(appUser);

        sendVeryficationEmail(loginUserDto.getEmail());

        System.out.println("Created!");
        return ResponseEntity.ok("Verify email by the link sent on your email address");

    }

    public void sendVeryficationEmail(String email) {
        AppUser appUser = usersRepo.findByEmail(email);

        if (confirmationTokenRepository.existsByAppUserUserId(appUser.getUserId())) { // ?
            var tokenId = confirmationTokenRepository.findByAppUserUserId(appUser.getUserId()).getTokenId();
            confirmationTokenRepository.deleteById(tokenId);
        }

        ConfirmationToken confirmationToken = new ConfirmationToken(appUser);
        confirmationToken.setExpiryDate(confirmationToken.calculateExpiryDate());
        confirmationTokenRepository.save(confirmationToken);

        emailSender.sendEmail(email, "Confirm account",
                "Click on the link to confirm account! " + "http://localhost:8080/api/auth/confirm-account?token="
                        + confirmationToken.getConfirmationToken());
    }

    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);
        Calendar cal = Calendar.getInstance();
        if (token != null && (token.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            confirmationTokenRepository.deleteById(token.getTokenId());
            return ResponseEntity.badRequest().body("Error: Email is expired");
        }

        if (token != null) {
            AppUser user = usersRepo.findByEmailIgnoreCase(token.getUserEntity().getEmail());
            // user.setChain(chain.generateNextChain());
            user.setEmailConfirmed(true);
            System.out.println(chain.generateNextChain());
            usersRepo.save(user);
            confirmationTokenRepository.deleteById(token.getTokenId());
            return ResponseEntity.ok("Email verified successfully!");
        }

        return ResponseEntity.badRequest().body("Error: Couldn't verify email or email is expired");
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

    public boolean checkConfirmedEmail(Long id) {
        AppUser user = usersRepo.findById(id).get();
        return user.isEmailConfirmed();

    }
}
