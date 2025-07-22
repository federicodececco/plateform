package com.plateform.restfinder.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@Data
public class GoogleConfig {

    @Value("${MAPS_API_KEY}")
    private String apiKey;

    private String baseUrl = "https://places.googleapis.com/v1";

}
