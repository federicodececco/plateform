package com.plateform.restfinder.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "photos")
@Getter
@Setter
@NoArgsConstructor
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "place_id")
    @JsonBackReference
    private Place place;

    @Column(name = "cover_image_name", length = 500)
    private String photoReference;

    private String fileName;

    private String contentType;

    private String filePath;

    private LocalDateTime downloadTime;

    public Photo(Place place, String photoReference, String fileName) {
        this.place = place;
        this.photoReference = photoReference;
        this.fileName = fileName;
        this.downloadTime = LocalDateTime.now();
    }

}
