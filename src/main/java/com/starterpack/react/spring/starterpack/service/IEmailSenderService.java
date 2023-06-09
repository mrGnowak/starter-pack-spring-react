package com.starterpack.react.spring.starterpack.service;

public interface IEmailSenderService {
    void sendEmail(String to, String subject, String message);
}
