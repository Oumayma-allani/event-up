package com.billcom.eventup.service;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendConfirmation(String to, String subject, String content) throws MessagingException {

        System.out.println("📨 Envoi mail à : " + to);
        System.out.println("Sujet : " + subject);
        System.out.println("Contenu :\n" + content);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true); // true = HTML

        mailSender.send(message);
    }
}
