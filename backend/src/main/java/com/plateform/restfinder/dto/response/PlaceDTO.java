
package com.plateform.restfinder.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlaceDTO {
    private String id;
    private String name;
    private String address;
    private String adressNumber;
    private String city;
    private Integer cap;
    private String province;
    private String region;
    private String nation;
    private Double latitude;
    private Double longitude;
    private String mainCategory;
    private String coverImageName;
    private String phoneNumber;
    private String priceRange;
    private Double rating;
    private Integer reviewNumber;
    private String googleMapsURL;
    private String webSiteURL;
    private String plateformID;
    private String plateformURL;
    private Boolean blacklist;
    private Boolean isEdited;
    private String slugName;

    // Solo i nomi delle categorie/tags, non gli oggetti completi
    private java.util.Set<String> categoryNames;
    private java.util.Set<String> tagNames;
    private java.util.Set<String> photoFileNames;

    // Costruttore che converte da Place
    public PlaceDTO(com.plateform.restfinder.model.Place place) {
        this.id = place.getId();
        this.name = place.getName();
        this.address = place.getAddress();
        this.adressNumber = place.getAdressNumber();
        this.city = place.getCity();
        this.cap = place.getCap();
        this.province = place.getProvince();
        this.region = place.getRegion();
        this.nation = place.getNation();
        this.latitude = place.getLatitude();
        this.longitude = place.getLongitude();
        this.mainCategory = place.getMainCategory();
        this.coverImageName = place.getCoverImageName();
        this.phoneNumber = place.getPhoneNumber();
        this.priceRange = place.getPriceRange();
        this.rating = place.getRating();
        this.reviewNumber = place.getReviewNumber();
        this.googleMapsURL = place.getGoogleMapsURL();
        this.webSiteURL = place.getWebSiteURL();
        this.plateformID = place.getPlateformID();
        this.plateformURL = place.getPlateformURL();
        this.blacklist = place.getBlacklist();
        this.isEdited = place.getIsEdited();
        this.slugName = place.getSlugName();

        // Converti le relazioni in semplici nomi
        if (place.getCategories() != null) {
            this.categoryNames = place.getCategories().stream()
                    .map(cat -> cat.getGoogleName())
                    .collect(java.util.stream.Collectors.toSet());
        }

        if (place.getTags() != null) {
            this.tagNames = place.getTags().stream()
                    .map(tag -> tag.getGoogleName())
                    .collect(java.util.stream.Collectors.toSet());
        }

        if (place.getPhotos() != null) {
            this.photoFileNames = place.getPhotos().stream()
                    .map(photo -> photo.getFileName())
                    .collect(java.util.stream.Collectors.toSet());
        }
    }
}