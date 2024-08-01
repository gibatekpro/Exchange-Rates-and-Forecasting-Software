package com.gibatekpro.exchange_rate_app_springboot.config.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;


public class FirebaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseConfig.class);


    public FirebaseApp initializeFirebaseApp() throws IOException {

        logger.info("Initializing Firebase App...");
        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("exchange-rate-app-9a2c0-firebase-adminsdk-y5ssh-69c4699f2b.json");

        if (serviceAccount == null) {
            throw new FileNotFoundException("Resource not found: exchange-rate-app-9a2c0-firebase-adminsdk-y5ssh-69c4699f2b.json");
        }

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        return FirebaseApp.initializeApp(options);
    }
}