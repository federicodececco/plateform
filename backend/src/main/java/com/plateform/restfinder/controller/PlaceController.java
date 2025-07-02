package com.plateform.restfinder.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateform.restfinder.dto.response.PlaceResponse;
import com.plateform.restfinder.dto.response.PlacesResponseList;
import com.plateform.restfinder.model.Place;
import com.plateform.restfinder.services.GooglePlacesService;
import com.plateform.restfinder.services.PlaceService;

import jakarta.validation.constraints.Null;
import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @Autowired
    private GooglePlacesService googlePlacesService;

    // frontend view

    @GetMapping("/search-text")
    public Mono<PlacesResponseList> searchText(@RequestParam String query,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude, @RequestParam(required = false) Double radius,
            @RequestParam(required = false) Integer maxResults) {
        return googlePlacesService.searchText(query, latitude, longitude, radius, maxResults);
    }

    @GetMapping("/details/{id}")
    public Mono<PlaceResponse> getDetails(@PathVariable String id,
            @RequestParam(required = false) List<String> masks) {

        return googlePlacesService.getPlaceDetails(id, masks);
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
        placetoSave.setAddress(googleResponse.getAddressComponents().get(2).getLongText());
        placetoSave.setAdressNumber(googleResponse.getAddressComponents().get(1).getLongText());
        placetoSave.setCity(googleResponse.getAddressComponents().get(3).getShortText());
        placetoSave.setCap(Integer.valueOf(googleResponse.getAddressComponents().get(8).getLongText()));
        placetoSave.setProvince(googleResponse.getAddressComponents().get(5).getShortText());
        placetoSave.setNation(googleResponse.getAddressComponents().get(7).getLongText());
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

        Set<String> tags = new HashSet<>();
        if (googleResponse.getTakeout() != null && googleResponse.getTakeout() != false) {
            tags.add("Takeout");
        }
        if (googleResponse.getDineIn() != null && googleResponse.getDineIn() != false) {
            tags.add("DineIn");
        }
        if (googleResponse.getReservable() != null && googleResponse.getReservable() != false) {
            tags.add("Reservable");
        }
        if (googleResponse.getServesLunch() != null && googleResponse.getServesLunch() != false) {
            tags.add("servesLunch");
        }
        if (googleResponse.getServesDinner() != null && googleResponse.getServesDinner() != false) {
            tags.add("servesDinner");
        }
        if (googleResponse.getServesBeer() != null && googleResponse.getServesBeer() != false) {
            tags.add("ServesBeer");
        }
        if (googleResponse.getServesWine() != null && googleResponse.getServesWine() != false) {
            tags.add("ServesWine");
        }
        if (googleResponse.getOutdoorSeating() != null && googleResponse.getOutdoorSeating() != false) {
            tags.add("OutdoorSeating");
        }
        if (googleResponse.getMenuForChildren() != null && googleResponse.getMenuForChildren() != false) {
            tags.add("MenuForChildren");
        }
        if (googleResponse.getServesDessert() != null && googleResponse.getServesDessert() != false) {
            tags.add("ServesDessert");
        }
        if (googleResponse.getServesCoffee() != null && googleResponse.getServesCoffee() != false) {
            tags.add("ServesCoffee");
        }
        if (googleResponse.getRestroom() != null && googleResponse.getRestroom() != false) {
            tags.add("Restroom");
        }
        if (googleResponse.getAccessibilityOptions() != null
                && googleResponse.getAccessibilityOptions().getWheelchairAccessibleRestroom() != false) {
            tags.add("wheelchairAccessibleRestroom");
        }
        if (googleResponse.getAccessibilityOptions() != null
                && googleResponse.getAccessibilityOptions().getWheelchairAccessibleSeating() != false) {
            tags.add("wheelchairAccessibleSeating");
        }
        if (googleResponse.getPaymentOptions() != null
                && googleResponse.getPaymentOptions().getAcceptCashOnly() != false) {
            tags.add("acceptCashOnly");
        }
        if (googleResponse.getPaymentOptions() != null
                && googleResponse.getPaymentOptions().getAcceptsDebitCards() != false) {
            tags.add("acceptsDebitCards");
        }
        if (googleResponse.getPaymentOptions() != null
                && googleResponse.getPaymentOptions().getAcceptsNfc() != false) {
            tags.add("acceptsNfc");
        }
        if (googleResponse.getParkingOptions() != null
                && googleResponse.getParkingOptions().getPaidParkingLot() != false) {
            tags.add("paidParkingLot");
        }
        if (googleResponse.getParkingOptions() != null
                && googleResponse.getParkingOptions().getPaidStreetParking() != false) {
            tags.add("paidStreetParking");
        }

        placetoSave.setTags(tags);
        return placeService.create(placetoSave);
    }

}
