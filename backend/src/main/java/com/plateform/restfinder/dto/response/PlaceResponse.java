package com.plateform.restfinder.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.plateform.restfinder.dto.request.Coordinates;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlaceResponse {

    private String name;
    private String id;
    private List<String> types;
    private String formattedAddress;
    private List<AdressComponents> addressComponents;
    private Coordinates location;
    private Double rating;
    private String googleMapsUri;
    private String webSiteURL;
    private String priceLevel;
    private Integer userRatingCount;
    private List<Photo> photos;

    private String internationalPhoneNumber;

    // nome
    private DisplayName displayName;
    // primary category
    private PrimaryCategory primaryTypeDisplayName;
    // tags
    private Boolean takeout;
    private Boolean dineIn;
    private Boolean reservable;
    private Boolean servesLunch;
    private Boolean servesDinner;
    private Boolean servesBeer;
    private Boolean servesWine;
    private Boolean outdoorSeating;
    private Boolean menuForChildren;
    private Boolean servesDessert;
    private Boolean servesCoffee;
    private Boolean restroom;
    private Boolean curbsidePickup;
    private AccessibilityOptions accessibilityOptions;
    private PaymentOptions paymentOptions;
    private ParkingOptions parkingOptions;

    private Boolean liveMusic;
    private Boolean allowsDogs;
    private Boolean goodForGroups;
    private Boolean goodForWatchingSports;
    private Boolean goodForChildren;
    private Boolean servesBreakfast;
    private Boolean servesBrunch;
    private Boolean servesVegetarianFood;

}