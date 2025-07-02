package com.plateform.restfinder.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;

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

    // googel place id
    @Id
    private String id;

    private String name;

    private String address;

    private String adressNumber;

    private String city;

    private Integer cap;

    private String province;

    private String nation;

    private Double latitude;

    private Double longitude;

    private String mainCategory;

    private String coverImageName;

    /*
     * String menu link??
     * 
     * @Lob
     * String description???
     */

    private String phoneNumber;

    private String priceRange;

    private Double rating;

    private Integer reviewNumber;

    // private Integer reviewAverage;

    private String googleMapsURL;

    private String webSiteURL;

    private String plateformID;

    private String plateformURL;

    private Boolean blacklist;

    private Boolean isEdited; // edited by user, not to update with google

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "category_place", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    @JsonManagedReference
    private Set<Category> categories;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "place_service", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "tags_id"))
    @JsonManagedReference
    private Set<Tags> tags;

    private Integer ratingClassId;

    public Place(String id, String name, String address, String city, Integer cap, String province,
            String nation, Double latitude, Double longitude, String mainCategory,
            String image, String phoneNumber, String priceRange, Double rating, Integer reviewNumber,

            String googleMapsURL, String webSiteURL, String plateformID, String plateformURL,
            Set<Tags> tags, Set<Category> categories) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.cap = cap;
        this.province = province;
        this.nation = nation;
        this.latitude = latitude;
        this.longitude = longitude;
        this.mainCategory = mainCategory;

        // this.image = image;
        this.phoneNumber = phoneNumber;
        this.priceRange = priceRange;
        this.rating = rating;
        this.reviewNumber = reviewNumber;

        this.googleMapsURL = googleMapsURL;
        this.webSiteURL = webSiteURL;
        this.plateformID = plateformID;
        this.plateformURL = plateformURL;
        this.tags = tags;
        this.categories = categories;
    }
}
