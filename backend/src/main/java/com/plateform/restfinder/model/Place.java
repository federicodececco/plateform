package com.plateform.restfinder.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;

import jakarta.persistence.Id;
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
@Table(name = "places")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Place {

    // googel place id
    @Schema(description = "Id generato da google, una stringa")
    @Id
    private String id;

    @Schema(description = "Nome del locale")
    private String name;

    @Schema(description = "Via/piazza dell'indirizzo")
    private String address;

    @Schema(description = "Numero civico")
    private String adressNumber;

    @Schema(description = "Città")
    private String city;

    @Schema(description = "Cap")
    private Integer cap;

    @Schema(description = "Provincia")
    private String province;

    @Schema(description = "Nazione")
    private String nation;

    @Schema(description = "Latitudine")
    private Double latitude;

    @Schema(description = "Longitudine")
    private Double longitude;

    @Schema(description = "Categoria principale")
    private String mainCategory;
    @Schema(description = "Nome di google, quindi una stringa ")
    @Column(name = "cover_image_name", length = 500)
    private String coverImageName;

    /*
     * String menu link??
     * 
     * @Lob
     * String description???
     */

    @Schema(description = "numero telefonico")
    private String phoneNumber;

    @Schema(description = "range di prezzo, può essere: free, inexpensive, moderate, expensive, very expensive")
    private String priceRange;

    @Schema(description = "media delle recensioni")
    private Double rating;

    @Schema(description = "numero delle recensioni")
    private Integer reviewNumber;

    // private Integer reviewAverage;
    @Schema(description = "link a google maps del ristorante ")
    private String googleMapsURL;

    @Schema(description = "link al sito web, spesso facebook")
    private String webSiteURL;

    @Schema(description = "id plateform del luogo")
    private String plateformID;

    @Schema(description = "url di collegamento a plateform")
    private String plateformURL;

    @Schema(description = "indicazione booleana per vedere se il luogo è blacklisted  ")
    private Boolean blacklist;

    @Schema(description = "indicazione boolena per vedere se il luogo è stato editato da un utente manualemente")
    private Boolean isEdited; // edited by user, not to update with google

    @Schema(description = "Array di oggeti Categoria collegate al luogo")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "category_place", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    @JsonManagedReference
    private Set<Category> categories;

    @Schema(description = "Array di oggetti Tag collegati al luogo")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "place_tag", joinColumns = @JoinColumn(name = "place_id"), inverseJoinColumns = @JoinColumn(name = "tags_id"))
    @JsonManagedReference
    private Set<Tag> tags;

    @Schema(description = "Array di oggetti Photo collegati al luogo")
    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    @JsonManagedReference
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
        this.photos = photos;
    }
}
