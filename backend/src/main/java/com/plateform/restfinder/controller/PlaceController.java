package com.plateform.restfinder.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.slugify.Slugify;
import com.plateform.restfinder.dto.response.AdressComponents;
import com.plateform.restfinder.dto.response.PlaceResponse;
import com.plateform.restfinder.dto.response.PlacesResponseList;
import com.plateform.restfinder.model.Category;
import com.plateform.restfinder.model.Photo;
import com.plateform.restfinder.model.Place;
import com.plateform.restfinder.model.Tag;
import com.plateform.restfinder.services.CategoryService;
import com.plateform.restfinder.services.GooglePlacesService;
import com.plateform.restfinder.services.PhotoService;
import com.plateform.restfinder.services.PlaceService;

import com.plateform.restfinder.services.TagServiceMapping;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * Controller REST per la gestione dei luoghi nella piattaforma RestFinder.
 * 
 * Questo controller fornisce endpoint per:
 * - Ricerca e recupero luoghi
 * - Integrazione con Google Places API
 * - Gestione foto
 * - Filtri e ricerca avanzata
 * 
 * @author Federico De Cecco, Marco Mechini
 * 
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/places")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Places", description = "API per la gestione dei luoghi")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @Autowired
    private TagServiceMapping tagServiceMapping;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private GooglePlacesService googlePlacesService;

    @Autowired
    private PhotoService photoService;

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

    @DeleteMapping("/delete")
    public void setBlackList(String id) {
        placeService.falseDeleteById(id);
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

    @GetMapping("/proximity")
    public Mono<ResponseEntity<List<Place>>> searchPlacesInRadius(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam Double radius) {

        if (latitude == null || longitude == null || radius == null) {
            return Mono.just(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
        }

        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return Mono.just(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
        }

        if (radius <= 0) {
            return Mono.just(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
        }

        List<Place> places = placeService.findPlacesWithinRadius(latitude, longitude, radius);
        return Mono.just(new ResponseEntity<>(places, HttpStatus.OK));
    }

    @GetMapping("/region/{region}")
    public Mono<ResponseEntity<List<Place>>> findByRegion(@PathVariable String region) {
        try {
            return Mono.just(new ResponseEntity<>(placeService.findByRegion(region), HttpStatus.OK));
        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/province/{province}")
    public Mono<ResponseEntity<List<Place>>> findByProvince(@PathVariable String province) {
        try {
            return Mono.just(new ResponseEntity<>(placeService.findByProvince(province), HttpStatus.OK));
        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    // database post
    @PostMapping("/save/{id}")
    public Mono<Place> addPlace(@PathVariable String id, @RequestParam(required = false) List<String> masks) {

        return googlePlacesService.getPlaceDetails(id, masks)
                .flatMap(googleResponse -> {
                    Place placetoSave = new Place();
                    placetoSave.setId(googleResponse.getId());
                    placetoSave.setName(googleResponse.getDisplayName().getText());

                    Iterator<AdressComponents> iter = googleResponse.getAddressComponents().iterator();
                    while (iter.hasNext()) {
                        AdressComponents component = iter.next();
                        String type = component.getTypes().get(0);

                        if (type.equals("street_number")) { // numero civico
                            placetoSave.setAdressNumber(component.getLongText());
                        } else if (type.equals("route")) {// strada
                            placetoSave.setAddress(component.getLongText());
                        } else if (type.equals("administrative_area_level_3")) {// città
                            placetoSave.setCity(component.getLongText());
                        } else if (type.equals("administrative_area_level_1")) {// regione
                            placetoSave.setRegion(component.getLongText());
                        } else if (type.equals("country")) {// nazione
                            placetoSave.setNation(component.getLongText());
                        } else if (type.equals("postal_code")) {// cap
                            placetoSave.setCap(Integer.valueOf(component.getLongText()));
                        } else if (type.equals("administrative_area_level_2")) {// provincia
                            placetoSave.setProvince(component.getShortText());
                        }
                    }

                    placetoSave.setLatitude(googleResponse.getLocation().getLatitude());
                    placetoSave.setLongitude(googleResponse.getLocation().getLongitude());
                    if (googleResponse.getPrimaryTypeDisplayName() != null) {
                        placetoSave.setMainCategory(googleResponse.getPrimaryTypeDisplayName().getText());
                    }

                    if (googleResponse.getPhotos() != null && googleResponse.getPhotos().size() > 1) {
                        String namePartial = googleResponse.getPhotos().get(1).getName();
                        String nameFinal = googleResponse.getPhotos().get(1).getName().substring(
                                namePartial.length() - 306,
                                namePartial.length());
                        placetoSave.setCoverImageName(nameFinal);
                    }

                    placetoSave.setPhoneNumber(googleResponse.getInternationalPhoneNumber());
                    placetoSave.setRating(googleResponse.getRating());
                    placetoSave.setReviewNumber(googleResponse.getUserRatingCount());
                    placetoSave.setGoogleMapsURL(googleResponse.getGoogleMapsUri());
                    if (googleResponse.getWebsiteUri() != null) {
                        placetoSave.setWebSiteURL(googleResponse.getWebsiteUri());
                    } else {
                        placetoSave.setWebSiteURL("");
                    }
                    placetoSave.setPlateformID("");
                    placetoSave.setPlateformURL("");
                    placetoSave.setBlacklist(false);
                    placetoSave.setIsEdited(false);

                    placetoSave.setSlugName(slugify(googleResponse.getDisplayName().getText()));

                    // setting priceRange
                    if (googleResponse.getPriceLevel() != null) {
                        switch (googleResponse.getPriceLevel()) {
                            case "PRICE_LEVEL_MODERATE":
                                placetoSave.setPriceRange("moderate");
                                break;
                            case "PRICE_LEVEL_EXPENSIVE":
                                placetoSave.setPriceRange("expensive");
                                break;
                            case "PRICE_LEVEL_INEXPENSIVE":
                                placetoSave.setPriceRange("inexpensive");
                                break;
                            case "PRICE_LEVEL_VERY_EXPENSIVE":
                                placetoSave.setPriceRange("very expensive");
                                break;
                            case "PRICE_LEVEL_FREE":
                                placetoSave.setPriceRange("free");
                                break;
                            default:
                                placetoSave.setPriceRange(googleResponse.getPriceLevel());
                                break;
                        }
                    }

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
                            Category saved = categoryService.save(newCat);
                            categoryTmp.add(saved);
                        }
                    }
                    placetoSave.setCategories(categoryTmp);

                    Place savedPlace = placeService.create(placetoSave);

                    return processPhotos(googleResponse, savedPlace);
                })
                .onErrorResume(e -> {
                    System.err.println("Errore durante il salvataggio del place: " + e.getMessage());
                    e.printStackTrace();
                    return Mono.error(e);
                });
    }

    private Mono<Place> processPhotos(PlaceResponse googleResponse, Place savedPlace) {
        if (googleResponse.getPhotos() == null || googleResponse.getPhotos().isEmpty()) {
            return Mono.just(savedPlace);
        }

        int maxPhotos = Math.min(googleResponse.getPhotos().size(), 5); // salva solo 5 foto, o tutte se ce n'è sono
                                                                        // meno

        return Flux.range(0, maxPhotos)
                .flatMap(i -> {
                    try {
                        String fullPhotoName = googleResponse.getPhotos().get(i).getName();
                        String photoReference = fullPhotoName.substring(fullPhotoName.lastIndexOf("/") + 1);

                        System.out.println("Nome completo foto: " + fullPhotoName);
                        System.out.println("Photo reference estratto: " + photoReference);

                        Optional<Photo> existing = photoService.findByPhotoReference(savedPlace.getId(),
                                photoReference);

                        if (!existing.isPresent()) {
                            return photoService.downloadAndSavePhoto(
                                    savedPlace.getId(),
                                    photoReference,
                                    500,
                                    500)
                                    .doOnSuccess(downloadedPhoto -> {
                                        if (downloadedPhoto != null) {
                                            System.out.println(
                                                    "Foto scaricata con successo: " + downloadedPhoto.getFileName());
                                        } else {
                                            System.err.println(
                                                    "Errore nel download della foto con reference: " + photoReference);
                                        }
                                    })
                                    .onErrorResume(error -> {
                                        System.err.println("Errore durante il download della foto " + i + ": "
                                                + error.getMessage());
                                        error.printStackTrace();
                                        return Mono.empty(); // continua anche se una foto fallisce
                                    });
                        } else {
                            System.out.println("Foto già esistente: " + existing.get().getFilePath());
                            return Mono.just(existing.get());
                        }
                    } catch (Exception e) {
                        System.err.println("Errore durante il download della foto " + i + ": " + e.getMessage());
                        e.printStackTrace();
                        return Mono.empty(); // continua anche se una foto fallisce
                    }
                })
                .collectList()
                .map(photos -> {

                    Set<Photo> photoSet = photos.stream()
                            .filter(photo -> photo != null)
                            .collect(Collectors.toSet());

                    if (!photoSet.isEmpty()) {
                        savedPlace.setPhotos(photoSet);
                        return placeService.edit(savedPlace);
                    }
                    return savedPlace;
                });
    }

    @Operation(summary = "Ritorna un luogo in base all'ID", description = "Ritorna un luogo specifico posto in base al suo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Posto trovato"),
            @ApiResponse(responseCode = "404", description = "Posto non trovato")

    })
    @GetMapping("/details/{id}")
    public Mono<ResponseEntity<Place>> getPlaceDetails(@PathVariable String id) {
        Optional<Place> optPlace = placeService.findById(id);
        if (optPlace.isEmpty()) {
            return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }
        return Mono.just(new ResponseEntity<Place>(optPlace.get(), HttpStatus.OK));
    }

    @GetMapping("/search")
    public Mono<ResponseEntity<Page<Place>>> searchPlaces(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            if (size > 100)
                size = 100;
            if (size < 1)
                size = 10;

            Page<Place> results = placeService.search(name, page, size);

            return Mono.just(ResponseEntity.ok(results));
        } catch (Exception e) {
            System.err.print(e);
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    // download photo by reference and place id
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
    public Mono<ResponseEntity<List<Photo>>> getDownloadedPhotos(@PathVariable String placeId) {
        List<Photo> downloads = photoService.getDownloadsByPlaceId(placeId);
        return Mono.just(ResponseEntity.ok(downloads));
    }

    @GetMapping("/photo/json/{param}")
    public Mono<ResponseEntity<Photo>> getPhotoJson(@PathVariable String param) {
        try {
            Optional<Photo> photoOpt = photoService.findByFileName(param);
            if (!photoOpt.isEmpty()) {
                return Mono.just(ResponseEntity.ok(photoOpt.get()));
            } else
                return Mono.just(new ResponseEntity<>(HttpStatus.NOT_FOUND));

        } catch (Exception e) {
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/filter")
    public Mono<ResponseEntity<Page<Place>>> filter(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) String priceRange,
            @RequestParam(required = false) Integer rating,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            // Validazioni base
            if (size > 100)
                size = 100;
            if (size < 1)
                size = 10;
            if (page < 0)
                page = 0;

            if (rating != null && (rating < 0 || rating > 5)) {
                return Mono.just(ResponseEntity.badRequest().build());
            }

            if (priceRange != null && !priceRange.trim().isEmpty()) {
                Set<String> validPriceRanges = Set.of("free", "inexpensive", "moderate", "expensive", "very expensive");
                if (!validPriceRanges.contains(priceRange.toLowerCase())) {
                    return Mono.just(ResponseEntity.badRequest().build());
                }
            }

            Page<Place> results = placeService.filter(category, tags, priceRange, rating, page, size);

            return Mono.just(ResponseEntity.ok(results));

        } catch (Exception e) {
            System.err.println("Error in filter method: " + e.getMessage());
            e.printStackTrace();
            return Mono.just(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    // get photo by name
    @GetMapping("/photo/file/{filename}")
    public Mono<ResponseEntity<Resource>> getPhotoFile(@PathVariable String filename) {
        return Mono.fromCallable(() -> {
            try {

                Path filePath = Paths.get("backend/downloaded/photos/" + filename + ".jpg");

                if (!Files.exists(filePath)) {
                    filePath = Paths.get("backend/downloaded/photos/" + filename + ".png");
                }

                if (!Files.exists(filePath)) {
                    return ResponseEntity.notFound().build();
                }

                Resource resource = new FileSystemResource(filePath.toFile());

                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "image/jpeg";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + ".jpg\"")
                        .body(resource);

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        });
    }

    private static final Slugify slugger = Slugify.builder().transliterator(true).locale(Locale.ITALIAN).build();

    private String slugify(String name) {

        return slugger.slugify(name).toLowerCase();
    }
}
