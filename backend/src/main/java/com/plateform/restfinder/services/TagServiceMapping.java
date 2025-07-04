package com.plateform.restfinder.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plateform.restfinder.dto.response.AccessibilityOptions;
import com.plateform.restfinder.dto.response.ParkingOptions;
import com.plateform.restfinder.dto.response.PaymentOptions;
import com.plateform.restfinder.dto.response.PlaceResponse;
import com.plateform.restfinder.model.Tag;

@Service
public class TagServiceMapping {

    @Autowired
    private TagService tagService;

    /**
     * Function that takes a google response and extract its tags, returning a Set
     * of them.
     * 
     * @param googleResponse The Google Places API response containing place details
     * @return Set of Tag entities that match the true boolean values in the
     *         response
     */
    public Set<Tag> extractTagsFromGoogleResponse(PlaceResponse googleResponse) {
        Set<String> tagNames = new HashSet<>();

        addIfTrue(tagNames, "takeout", googleResponse.getTakeout());
        addIfTrue(tagNames, "dineIn", googleResponse.getDineIn());
        addIfTrue(tagNames, "curbsidePickup", googleResponse.getCurbsidePickup());
        addIfTrue(tagNames, "reservable", googleResponse.getReservable());
        addIfTrue(tagNames, "servesLunch", googleResponse.getServesLunch());
        addIfTrue(tagNames, "servesDinner", googleResponse.getServesDinner());
        addIfTrue(tagNames, "ServesBeer", googleResponse.getServesBeer());
        addIfTrue(tagNames, "ServesWine", googleResponse.getServesWine());
        addIfTrue(tagNames, "outdoorSeating", googleResponse.getOutdoorSeating());
        addIfTrue(tagNames, "menuForChildren", googleResponse.getMenuForChildren());
        addIfTrue(tagNames, "servesDessert", googleResponse.getServesDessert());
        addIfTrue(tagNames, "servesCoffee", googleResponse.getServesCoffee());
        addIfTrue(tagNames, "restroom", googleResponse.getRestroom());
        addIfTrue(tagNames, "liveMusic", googleResponse.getLiveMusic());
        addIfTrue(tagNames, "allowsDogs", googleResponse.getAllowsDogs());
        addIfTrue(tagNames, "goodForGroups", googleResponse.getGoodForGroups());
        addIfTrue(tagNames, "goodForWatchingSports", googleResponse.getGoodForWatchingSports());
        addIfTrue(tagNames, "goodForChildren", googleResponse.getGoodForChildren());
        addIfTrue(tagNames, "servesBreakfast", googleResponse.getServesBreakfast());
        addIfTrue(tagNames, "servesBrunch", googleResponse.getServesBrunch());
        addIfTrue(tagNames, "servesVegetarianFood", googleResponse.getServesVegetarianFood());

        if (googleResponse.getAccessibilityOptions() != null) {
            AccessibilityOptions accessibility = googleResponse.getAccessibilityOptions();
            addIfTrue(tagNames, "wheelchairAccessibleRestroom", accessibility.getWheelchairAccessibleRestroom());
            addIfTrue(tagNames, "wheelchairAccessibleSeating", accessibility.getWheelchairAccessibleSeating());
            addIfTrue(tagNames, "wheelchairAccessibleEntrance", accessibility.getWheelchairAccessibleEntrance());
            addIfTrue(tagNames, "wheelchairAccessibleParking", accessibility.getWheelchairAccessibleParking());
        }

        if (googleResponse.getPaymentOptions() != null) {
            PaymentOptions payment = googleResponse.getPaymentOptions();
            addIfTrue(tagNames, "acceptCashOnly", payment.getAcceptCashOnly());
            addIfTrue(tagNames, "acceptsDebitCards", payment.getAcceptsDebitCards());
            addIfTrue(tagNames, "acceptsNfc", payment.getAcceptsNfc());
        }

        if (googleResponse.getParkingOptions() != null) {
            ParkingOptions parking = googleResponse.getParkingOptions();
            addIfTrue(tagNames, "paidParkingLot", parking.getPaidParkingLot());
            addIfTrue(tagNames, "paidStreetParking", parking.getPaidStreetParking());
        }

        return convertStringToTag(tagNames);
    }

    private void addIfTrue(Set<String> tagNames, String tagName, Boolean value) {
        if (value != null && value) {
            tagNames.add(tagName);
        }
    }

    private Set<Tag> convertStringToTag(Set<String> tagNames) {
        Set<Tag> tags = new HashSet<>();
        for (String tagName : tagNames) {
            Optional<Tag> optTag = tagService.findByGLName(tagName);
            if (optTag.isPresent()) {
                tags.add(optTag.get());
            }
        }
        return tags;
    }
}
