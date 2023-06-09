package com.starterpack.react.spring.starterpack.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.starterpack.react.spring.starterpack.dto.LoginUserDto;
import com.starterpack.react.spring.starterpack.model.AppUser;
import com.starterpack.react.spring.starterpack.repository.UsersRepo;
import com.starterpack.react.spring.starterpack.security.Chain;

@Component
public class UserService {

    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private PasswordEncoder globalPasswordEncoder;

    public String saveNewUser(LoginUserDto loginUserDto) {

        AppUser appUser = new AppUser();
        if (checkUserExistEmail(loginUserDto.getEmail())) {
            String hashPass = globalPasswordEncoder.encode(loginUserDto.getPassword());
            appUser.setHash(hashPass);
            appUser.setChain("0");
            appUser.setEmail(loginUserDto.getEmail());
            usersRepo.save(appUser);
            sendVerificationEmail(loginUserDto.getEmail());
            System.out.println("Created!");
            return "Created!";
        } else {
            System.out.println("This email is already in use!");
            return "This email is already in use!";
        }

    }

    public Boolean checkUserExistEmail(String email) {
        if (usersRepo.findByEmail(email) == null) {
            return true;
        }
        return false;
    }

    public boolean checkPasswordMatches(String password, String hashPassword) {
        boolean isPasswordMatches = globalPasswordEncoder.matches(password, hashPassword);
        return isPasswordMatches;
    }

    public Long returnLoggedUserId(String email, String password) {
        var user = usersRepo.findByEmail(email);
        if (user == null) {
            return null;
        } else {
            var checkPass = checkPasswordMatches(password, user.getHash());
            if (checkPass) {
                return user.getId();
            }
        }
        return null;

    }

    public AppUser getUserById(Long userId) {
        var user = usersRepo.findById(userId);
        return user.isPresent() ? user.get() : null;
    }

    public void updateUser(AppUser appUser) {
        var id = appUser.getId();
        var newUser = usersRepo.findById(id).get();
        newUser.setHash(globalPasswordEncoder.encode(appUser.getHash()));
        usersRepo.save(newUser);

    }

    public void sendVerificationEmail(String email) {
        emailSender.sendEmail(email, "Confirm account", "Click on the link to confirm account! LINK");
    }

}
