package com.plateform.restfinder.services;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.plateform.restfinder.config.GoogleConfig;
import com.plateform.restfinder.dto.request.Circle;
import com.plateform.restfinder.dto.request.Coordinates;
import com.plateform.restfinder.dto.request.LocationBias;
import com.plateform.restfinder.dto.request.TextRequest;
import com.plateform.restfinder.dto.response.PlacesResponseList;

import reactor.core.publisher.Mono;

@Service
public class GooglePlacesService {

    private final WebClient webClient;
    private final GoogleConfig config;

    public GooglePlacesService(WebClient.Builder webClientBuilder, GoogleConfig config) {
        this.config = config;

        this.webClient = webClientBuilder
                .baseUrl(config.getBaseUrl())
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(1024 * 1024))
                .defaultHeader("X-Goog-Api-Key", config.getApiKey())
                .defaultHeader("X-Goog-FieldMask", "*")
                .build();
    }

    public Mono<PlacesResponseList> searchText(String query, Double latitude, Double longitude, Double radius,
            Integer maxResults) {
        TextRequest req = new TextRequest();
        req.setTextQuery(query);
        req.setMaxResultCount(maxResults != null ? maxResults : 5);
        req.setLanguageCode("en");

        // if coordinates are provided the bias get set to a cricle
        if (latitude != null && longitude != null) {
            Coordinates center = new Coordinates();
            center.setLatitude(latitude);
            center.setLongitude(longitude);

            Circle circle = new Circle();
            circle.setCenter(center);
            circle.setRadius(radius != null ? radius : 5000.0);

            LocationBias locationBias = new LocationBias();
            locationBias.setCircle(circle);

            req.setLocationBias(locationBias);
        }

        return webClient.post()
                .uri("/places:searchText")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(req)
                .retrieve()
                .bodyToMono(PlacesResponseList.class);

    }

}
