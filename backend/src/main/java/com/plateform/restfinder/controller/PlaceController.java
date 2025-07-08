package com.plateform.restfinder.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateform.restfinder.dto.response.PlaceResponse;
import com.plateform.restfinder.dto.response.PlacesResponseList;
import com.plateform.restfinder.model.Category;
import com.plateform.restfinder.model.Photo;
import com.plateform.restfinder.model.Place;
import com.plateform.restfinder.model.Tag;
import com.plateform.restfinder.repository.CategoryRepository;
import com.plateform.restfinder.services.CategoryService;
import com.plateform.restfinder.services.GooglePlacesService;
import com.plateform.restfinder.services.PhotoService;
import com.plateform.restfinder.services.PlaceService;
import com.plateform.restfinder.services.TagService;
import com.plateform.restfinder.services.TagServiceMapping;

import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    private final CategoryRepository categoryRepository;

    @Autowired
    private PlaceService placeService;

    @Autowired
    private TagService tagService;

    @Autowired
    private TagServiceMapping tagServiceMapping;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private GooglePlacesService googlePlacesService;

    @Autowired
    private PhotoService photoService;

    PlaceController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // frontend view

    @GetMapping("/google-search-text")
    public Mono<ResponseEntity<PlacesResponseList>> searchText(@RequestParam String query,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude, @RequestParam(required = false) Double radius,
            @RequestParam(required = false) Integer maxResults) {

        try {
            if (query == null || query.trim().isEmpty()) {
                return Mono.just(ResponseEntity.badRequest().build());
            }
            if (latitude != null && (latitude < -90 || latitude > 90)) {
                return Mono.just(ResponseEntity.badRequest().build());
            }
            if (longitude != null && (longitude < -180 || longitude > 180)) {
                return Mono.just(ResponseEntity.badRequest().build());
            }
            return googlePlacesService.searchText(query, latitude, longitude, radius, maxResults)
                    .map(result -> new ResponseEntity<>(result, HttpStatus.OK));

        } catch (Exception e) {

            return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
        }
    }

    @GetMapping("/google-search-text-debug")
    public Mono<String> searchTextDebug(@RequestParam String query,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude, @RequestParam(required = false) Double radius,
            @RequestParam(required = false) Integer maxResults) {
        return googlePlacesService.searchTextDebug(query, latitude, longitude, radius, maxResults);
    }

    @GetMapping("/google-details/{id}")
    public Mono<ResponseEntity<PlaceResponse>> getDetails(@PathVariable String id,
            @RequestParam(required = false) List<String> masks) {
        try {
            if (id == null || id.trim().isEmpty()) {
                return Mono.just(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
            }

            return googlePlacesService.getPlaceDetails(id, masks)
                    .map(result -> new ResponseEntity<>(result, HttpStatus.OK));

        } catch (Exception e) {

            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/google-details-debug/{id}")
    public Mono<String> getDetailsDebug(@PathVariable String id,
            @RequestParam(required = false) List<String> masks) {

        return googlePlacesService.getPlaceDetailsDebug(id, masks);
    }

    // database post
    @PostMapping("/save/{id}")
    public Place addPlace(@PathVariable String id, @RequestParam(required = false) List<String> masks) {

        PlaceResponse googleResponse = googlePlacesService.getPlaceDetails(id, masks).block();

        Place placetoSave = new Place();
        placetoSave.setId(googleResponse.getId());
        placetoSave.setName(googleResponse.getDisplayName().getText());
        placetoSave.setAddress(googleResponse.getAddressComponents().get(1).getLongText());
        placetoSave.setAdressNumber(googleResponse.getAddressComponents().get(0).getLongText());
        placetoSave.setCity(googleResponse.getAddressComponents().get(2).getShortText());
        placetoSave.setCap(Integer.valueOf(googleResponse.getAddressComponents().get(7).getLongText()));
        placetoSave.setProvince(googleResponse.getAddressComponents().get(4).getShortText());
        placetoSave.setNation(googleResponse.getAddressComponents().get(6).getLongText());
        placetoSave.setLatitude(googleResponse.getLocation().getLatitude());
        placetoSave.setLongitude(googleResponse.getLocation().getLongitude());
        placetoSave.setMainCategory(googleResponse.getPrimaryTypeDisplayName().getText());

        String namePartial = googleResponse.getPhotos().get(1).getName();
        String nameFinal = googleResponse.getPhotos().get(1).getName().substring(namePartial.length() - 306,
                namePartial.length());
        placetoSave.setCoverImageName(nameFinal);

        placetoSave.setPhoneNumber(googleResponse.getInternationalPhoneNumber());
        placetoSave.setRating(googleResponse.getRating());
        placetoSave.setReviewNumber(googleResponse.getUserRatingCount());
        placetoSave.setGoogleMapsURL(googleResponse.getGoogleMapsUri());
        if (googleResponse.getWebSiteURL() != null) {
            placetoSave.setWebSiteURL(googleResponse.getWebSiteURL());
        } else {
            placetoSave.setWebSiteURL("");
        }
        placetoSave.setPlateformID("");
        placetoSave.setPlateformURL("");
        placetoSave.setBlacklist(false);
        placetoSave.setIsEdited(false);

        // setting tags

        Set<Tag> tagsFinal = tagServiceMapping.extractTagsFromGoogleResponse(googleResponse);

        placetoSave.setTags(tagsFinal);

        // setting categories

        List<Category> existingCategories = categoryService.findAll();
        Map<String, Category> categoryMap = new HashMap<>();

        for (Category cat : existingCategories) {
            categoryMap.put(cat.getGoogleName(), cat);
        }

        Set<Category> categoryTmp = new HashSet<>();

        for (String googleType : googleResponse.getTypes()) {
            if (categoryMap.containsKey(googleType)) {
                categoryTmp.add(categoryMap.get(googleType));
            } else {
                Category newCat = new Category();
                newCat.setGoogleName(googleType);
                Category saved = categoryRepository.save(newCat);
                categoryTmp.add(saved);
            }
        }

        placetoSave.setCategories(categoryTmp);

        return placeService.create(placetoSave);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<Place> getPlaceDetails(@PathVariable String id) {
        Optional<Place> optPlace = placeService.findById(id);
        if (optPlace.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Place>(optPlace.get(), HttpStatus.OK);
    }

    @GetMapping("/{placeId}/photos/{photoReference}")
    public Mono<ResponseEntity<String>> downloadPlacePhoto(
            @PathVariable String photoReference,
            @PathVariable String placeId) {

        if (photoReference == null || photoReference.trim().isEmpty()) {
            return Mono.just(ResponseEntity.badRequest()
                    .body("Photo reference cannot be empty"));
        }

        int width = 500;
        int height = 500;

        try {
            // Check if already downloaded
            Optional<Photo> existing = photoService.findByPhotoReference(placeId, photoReference);
            if (existing.isPresent()) {
                return Mono.just(ResponseEntity.ok("Foto già scaricata: " + existing.get().getFilePath()));
            }

            Path downloadDir = Path.of("downloaded");
            if (!Files.exists(downloadDir)) {
                Files.createDirectories(downloadDir);
            }

            return photoService.downloadAndSavePhoto(placeId, photoReference, width, height)
                    .map((Photo photo) -> ResponseEntity.ok(
                            "Foto scaricata con successo! " +
                                    "Filename: " + photo.getFileName() +
                                    ", Path: " + photo.getFilePath()))
                    .onErrorResume(e -> {
                        System.err.println("Error downloading photo: " + e.getMessage());
                        e.printStackTrace();

                        if (e.getMessage().contains("404") || e.getMessage().contains("NOT_FOUND")) {
                            return Mono.just(ResponseEntity.notFound().build());
                        } else if (e.getMessage().contains("403") || e.getMessage().contains("FORBIDDEN")) {
                            return Mono.just(ResponseEntity.status(HttpStatus.FORBIDDEN)
                                    .body("API key non valida o quota superata"));
                        } else {
                            return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                    .body("Errore durante il download della foto: " + e.getMessage()));
                        }
                    });

        } catch (Exception e) {
            return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Errore nella preparazione del download: " + e.getMessage()));
        }
    }

    @GetMapping("/{placeId}/photos")
    public ResponseEntity<List<Photo>> getDownloadedPhotos(@PathVariable String placeId) {
        List<Photo> downloads = photoService.getDownloadsByPlaceId(placeId);
        return ResponseEntity.ok(downloads);
    }

    // @GetMapping("/photos/file/{filename}")
    // public Mono<ResponseEntity<Resource>> getPhotoFile(@PathVariable String
    // filename) {
    // return photoService.findByFileName(filename)
    // .map(photoDownload -> {
    // try {
    // Path filePath = Path.of(photoDownload.getFilePath());
    // Resource resource = new FileSystemResource(filePath);
    // if (resource.exists()) {
    // return ResponseEntity.ok()
    // .contentType(MediaType.parseMediaType(
    // photoDownload.getContentType() != null ? photoDownload.getContentType()
    // : "image/jpeg"))
    // .body(resource);
    // } else {
    // return ResponseEntity.<Resource>notFound().build();
    // }
    // } catch (Exception e) {
    // return
    // ResponseEntity.<Resource>status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    // }
    // })
    // .map(Mono::just)
    // .orElse(Mono.just(ResponseEntity.notFound().build()));
    // }
}
