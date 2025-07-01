package com.plateform.restfinder.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "places")
@Getter @Setter @NoArgsConstructor @ToString
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    String name;

    String address;

    String city;

    Integer cap;

    String province;

    String nation;

    String latitude;

    String longitude;

    String mainCategoryId;

    String googlePlaceID;

    String image;

    /*
    String menu link?? 
    @Lob
    String description???
    */
    

    String phoneNumber;

    String priceRange;

    String rank;

    Integer reviewNumber;

    Integer reviewAverage;

    String googleMapsURL;

    String webSiteURL;

    String plateformID;

    String plateformURL;



    
}
