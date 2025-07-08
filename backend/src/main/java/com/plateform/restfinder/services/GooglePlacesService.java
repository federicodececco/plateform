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

    public Mono<Void> downloadPlacePhoto(String placeId, String photoReference, int maxWidth, int maxHeight,
            String basePath) {
        String url = String.format(
                "https://places.googleapis.com/v1/places/%s/photos/%s/media?maxHeightPx=%d&maxWidthPx=%d&key=%s",
                placeId, photoReference, maxHeight, maxWidth, config.getApiKey());

        System.out.println("Requesting URL: " + url);

        return webClient.get()
                .uri(url)
                .exchangeToMono(response -> {
                    System.out.println("Response status: " + response.statusCode());

                    if (!response.statusCode().is2xxSuccessful()) {

                        return response.bodyToMono(String.class)
                                .flatMap(errorBody -> {
                                    System.err.println("Error response body: " + errorBody);
                                    return Mono.error(new RuntimeException(
                                            "Failed to download photo: " + response.statusCode() + " - " + errorBody));
                                });
                    }

                    HttpHeaders headers = response.headers().asHttpHeaders();
                    String contentType = headers.getContentType() != null ? headers.getContentType().toString()
                            : "image/jpeg";

                    System.out.println("Content-Type: " + contentType);

                    Map<String, String> extMap = Map.of(
                            "image/jpeg", ".jpg",
                            "image/png", ".png",
                            "image/webp", ".webp",
                            "image/gif", ".gif");
                    String extension = extMap.getOrDefault(contentType, ".jpg");
                    String fullPath = basePath + extension;

                    System.out.println("Saving to: " + fullPath);
                    return response.bodyToFlux(DataBuffer.class)
                            .collectList()
                            .flatMap(dataBuffers -> {
                                try {

                                    int totalSize = dataBuffers.stream()
                                            .mapToInt(DataBuffer::readableByteCount)
                                            .sum();

                                    System.out.println("Total size: " + totalSize + " bytes");

                                    byte[] bytes = new byte[totalSize];
                                    int position = 0;

                                    for (DataBuffer buffer : dataBuffers) {
                                        int bufferSize = buffer.readableByteCount();
                                        buffer.read(bytes, position, bufferSize);
                                        position += bufferSize;
                                        DataBufferUtils.release(buffer);
                                    }

                                    Path path = Path.of(fullPath);
                                    Files.createDirectories(path.getParent());

                                    Files.write(path, bytes,
                                            StandardOpenOption.CREATE,
                                            StandardOpenOption.TRUNCATE_EXISTING);

                                    System.out.println("File saved successfully: " + fullPath);
                                    return Mono.<Void>empty();
                                } catch (Exception e) {

                                    dataBuffers.forEach(DataBufferUtils::release);
                                    System.err.println("File write error: " + e.getMessage());
                                    e.printStackTrace();
                                    return Mono.error(
                                            new RuntimeException("Failed to write photo to file: " + fullPath, e));
                                }
                            });
                })
                .doOnError(error -> {
                    System.err.println("Download error: " + error.getMessage());
                    error.printStackTrace();
                })
                .onErrorMap(Exception.class,
                        ex -> new RuntimeException("Error downloading photo with reference: " + photoReference, ex));
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
