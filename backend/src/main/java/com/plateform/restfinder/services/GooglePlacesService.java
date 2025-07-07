package com.plateform.restfinder.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.plateform.restfinder.config.GoogleConfig;
import com.plateform.restfinder.dto.request.Circle;
import com.plateform.restfinder.dto.request.Coordinates;
import com.plateform.restfinder.dto.request.LocationBias;
import com.plateform.restfinder.dto.request.TextRequest;
import com.plateform.restfinder.dto.response.PlaceResponse;
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

    public Mono<PlaceResponse> getPlaceDetails(String placeId, List<String> fieldMask) {
        return webClient.get()
                .uri("/places/{placeId}", placeId)
                .headers(headers -> {
                    if (fieldMask != null && !fieldMask.isEmpty()) {
                        headers.set("X-Goog-FieldMask", String.join(",", fieldMask));
                    }
                })
                .retrieve()
                .bodyToMono(PlaceResponse.class);

    }

    public Mono<Void> downloadPlacePhoto(String photoReference, int maxWidth, String basePath) {
        String url = String.format(
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=%d&photo_reference=%s&key=%s",
                maxWidth, photoReference, config.getApiKey());

        return webClient.get()
                .uri(url)
                .exchangeToMono(response -> {
                    HttpHeaders headers = response.headers().asHttpHeaders();
                    String contentType = headers.getContentType() != null ? headers.getContentType().toString()
                            : "image/jpeg";

                    // Estensione dal content-type
                    Map<String, String> extMap = Map.of(
                            "image/jpeg", ".jpg",
                            "image/png", ".png",
                            "image/webp", ".webp");
                    String extension = extMap.getOrDefault(contentType, ".jpg");
                    String fullPath = basePath + extension;

                    return response.bodyToFlux(DataBuffer.class)
                            .reduce(DataBuffer::write)
                            .flatMap(dataBuffer -> {
                                try {
                                    byte[] bytes = new byte[dataBuffer.readableByteCount()];
                                    dataBuffer.read(bytes);
                                    DataBufferUtils.release(dataBuffer);

                                    Path path = Path.of(fullPath);
                                    Files.write(path, bytes, StandardOpenOption.CREATE,
                                            StandardOpenOption.TRUNCATE_EXISTING);

                                    return Mono.empty();
                                } catch (Exception e) {
                                    return Mono.error(e);
                                }
                            });
                });
    }

    // debug
    public Mono<String> searchTextDebug(String query, Double latitude, Double longitude, Double radius,
            Integer maxResults) {
        TextRequest req = new TextRequest();
        req.setTextQuery(query);
        req.setMaxResultCount(maxResults != null ? maxResults : 5);
        req.setLanguageCode("en");

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
                .bodyToMono(String.class);

    }

    // debug
    public Mono<String> getPlaceDetailsDebug(String placeId, List<String> fieldMask) {
        return webClient.get()
                .uri("/places/{placeId}", placeId)
                .headers(headers -> {
                    if (fieldMask != null && !fieldMask.isEmpty()) {
                        headers.set("X-Goog-FieldMask", String.join(",", fieldMask));
                    }
                })
                .retrieve()
                .bodyToMono(String.class);

    }

}
