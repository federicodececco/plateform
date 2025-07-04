package com.plateform.restfinder.controller;

import java.util.ArrayList;
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
import com.plateform.restfinder.model.Place;
import com.plateform.restfinder.model.Tag;
import com.plateform.restfinder.repository.CategoryRepository;
import com.plateform.restfinder.services.CategoryService;
import com.plateform.restfinder.services.GooglePlacesService;
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

    PlaceController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // frontend view

    @GetMapping("/search-text")
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

    @GetMapping("/search-text-debug")
    public Mono<String> searchTextDebug(@RequestParam String query,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude, @RequestParam(required = false) Double radius,
            @RequestParam(required = false) Integer maxResults) {
        return googlePlacesService.searchTextDebug(query, latitude, longitude, radius, maxResults);
    }

    @GetMapping("/details/{id}")
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

    @GetMapping("/details-debug/{id}")
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

        // Set<String> tagsTmp = new HashSet<>();
        // if (googleResponse.getTakeout() != null && googleResponse.getTakeout() !=
        // false) {
        // tagsTmp.add("takeout");
        // }
        // if (googleResponse.getDineIn() != null && googleResponse.getDineIn() !=
        // false) {
        // tagsTmp.add("dineIn");
        // }
        // if (googleResponse.getCurbsidePickup() != null &&
        // googleResponse.getCurbsidePickup() != false) {
        // tagsTmp.add("curbsidePickup");
        // }
        // if (googleResponse.getReservable() != null && googleResponse.getReservable()
        // != false) {
        // tagsTmp.add("reservable");
        // }
        // if (googleResponse.getServesLunch() != null &&
        // googleResponse.getServesLunch() != false) {
        // tagsTmp.add("servesLunch");
        // }
        // if (googleResponse.getServesDinner() != null &&
        // googleResponse.getServesDinner() != false) {
        // tagsTmp.add("servesDinner");
        // }
        // if (googleResponse.getServesBeer() != null && googleResponse.getServesBeer()
        // != false) {
        // tagsTmp.add("ServesBeer");
        // }
        // if (googleResponse.getServesWine() != null && googleResponse.getServesWine()
        // != false) {
        // tagsTmp.add("ServesWine");
        // }
        // if (googleResponse.getOutdoorSeating() != null &&
        // googleResponse.getOutdoorSeating() != false) {
        // tagsTmp.add("outdoorSeating");
        // }
        // if (googleResponse.getMenuForChildren() != null &&
        // googleResponse.getMenuForChildren() != false) {
        // tagsTmp.add("menuForChildren");
        // }
        // if (googleResponse.getServesDessert() != null &&
        // googleResponse.getServesDessert() != false) {
        // tagsTmp.add("servesDessert");
        // }
        // if (googleResponse.getServesCoffee() != null &&
        // googleResponse.getServesCoffee() != false) {
        // tagsTmp.add("servesCoffee");
        // }
        // if (googleResponse.getRestroom() != null && googleResponse.getRestroom() !=
        // false) {
        // tagsTmp.add("restroom");
        // }
        // if (googleResponse.getAccessibilityOptions() != null
        // && googleResponse.getAccessibilityOptions().getWheelchairAccessibleRestroom()
        // != false) {
        // tagsTmp.add("wheelchairAccessibleRestroom");
        // }
        // if (googleResponse.getAccessibilityOptions() != null
        // && googleResponse.getAccessibilityOptions().getWheelchairAccessibleSeating()
        // != false) {
        // tagsTmp.add("wheelchairAccessibleSeating");
        // }
        // if (googleResponse.getAccessibilityOptions() != null
        // && googleResponse.getAccessibilityOptions().getWheelchairAccessibleEntrance()
        // != false) {
        // tagsTmp.add("wheelchairAccessibleEntrance");
        // }
        // if (googleResponse.getAccessibilityOptions() != null
        // && googleResponse.getAccessibilityOptions().getWheelchairAccessibleParking()
        // != false) {
        // tagsTmp.add("wheelchairAccessibleParking");
        // }

        // if (googleResponse.getPaymentOptions() != null
        // && googleResponse.getPaymentOptions().getAcceptCashOnly() != null
        // && googleResponse.getPaymentOptions().getAcceptCashOnly() != false) {
        // tagsTmp.add("acceptCashOnly");
        // }
        // if (googleResponse.getPaymentOptions() != null
        // && googleResponse.getPaymentOptions().getAcceptsDebitCards() != null
        // && googleResponse.getPaymentOptions().getAcceptsDebitCards() != false) {
        // tagsTmp.add("acceptsDebitCards");
        // }
        // if (googleResponse.getPaymentOptions() != null
        // && googleResponse.getPaymentOptions().getAcceptsNfc() != null
        // && googleResponse.getPaymentOptions().getAcceptsNfc() != false) {
        // tagsTmp.add("acceptsNfc");
        // }
        // if (googleResponse.getParkingOptions() != null
        // && googleResponse.getParkingOptions().getPaidParkingLot() != null
        // && googleResponse.getParkingOptions().getPaidParkingLot() != false) {
        // tagsTmp.add("paidParkingLot");
        // }
        // if (googleResponse.getParkingOptions() != null
        // && googleResponse.getParkingOptions().getPaidStreetParking() != null
        // && googleResponse.getParkingOptions().getPaidStreetParking() != false) {
        // tagsTmp.add("paidStreetParking");
        // }

        // Set<Tag> tagsFinal = new HashSet<>();
        // for (String name : tagsTmp) {
        // Optional<Tag> optTag = tagService.findByGLName(name);
        // if (!optTag.isEmpty()) {
        // tagsFinal.add(optTag.get());
        // }
        // }
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

}
