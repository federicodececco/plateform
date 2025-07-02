package com.plateform.restfinder.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "places")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String city;

    private Integer cap;

    private String province;

    private String nation;

    private String latitude;

    private String longitude;

    private String mainCategoryId;

    private String googlePlaceID;

    private String image;

    /*
     * String menu link??
     * 
     * @Lob
     * String description???
     */

    private String phoneNumber;

    private String priceRange;

    private String ranking;

    private Integer reviewNumber;

    private Integer reviewAverage;

    private String googleMapsURL;

    private String webSiteURL;

    private String plateformID;

    private String plateformURL;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "category_place", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    @JsonManagedReference
    private Set<Category> categories;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "place_service", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "service_id"))
    @JsonManagedReference
    private Set<Serviceing> services;

    public Place(Long id, String name, String address, String city, Integer cap, String province,
            String nation, String latitude, String longitude, String mainCategoryId, String googlePlaceID,
            String image, String phoneNumber, String priceRange, String ranking, Integer reviewNumber,
            Integer reviewAverage,
            String googleMapsURL, String webSiteURL, String plateformID, String plateformURL,
            Set<Serviceing> services, Set<Category> categories) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.cap = cap;
        this.province = province;
        this.nation = nation;
        this.latitude = latitude;
        this.longitude = longitude;
        this.mainCategoryId = mainCategoryId;
        this.googlePlaceID = googlePlaceID;
        this.image = image;
        this.phoneNumber = phoneNumber;
        this.priceRange = priceRange;
        this.ranking = ranking;
        this.reviewNumber = reviewNumber;
        this.reviewAverage = reviewAverage;
        this.googleMapsURL = googleMapsURL;
        this.webSiteURL = webSiteURL;
        this.plateformID = plateformID;
        this.plateformURL = plateformURL;
        this.services = services;
        this.categories = categories;
    }
}
