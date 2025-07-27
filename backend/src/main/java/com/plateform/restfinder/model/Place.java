package com.plateform.restfinder.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;

import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "places", indexes = {
        @Index(name = "idx_places_name_fulltext", columnList = "name")
})
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Place {

    @Id
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

    @Column(name = "cover_image_name", length = 500)
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

    private Boolean isEdited; // edited by user, not to update with google

    private String slugName;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "category_place", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "place_tag", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "tags_id"))
    private Set<Tag> tags;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Photo> photos;

    public Place(String id, String name, String address, String city, Integer cap, String province,
            String nation, Double latitude, Double longitude, String mainCategory,
            String image, String phoneNumber, String priceRange, Double rating, Integer reviewNumber,

            String googleMapsURL, String webSiteURL, String plateformID, String plateformURL,
            Set<Tag> tags, Set<Category> categories, Set<Photo> photos) {
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
        this.photos = photos;
    }
}
