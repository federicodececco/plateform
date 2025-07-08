package com.plateform.restfinder.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    private String placeId;
    @Column(name = "cover_image_name", length = 500)
    private String photoReference;

    private String fileName;

    private String contentType;

    private String filePath;

    private LocalDateTime downloadTime;

    public Photo(String placeId, String photoReference, String fileName) {
        this.placeId = placeId;
        this.photoReference = photoReference;
        this.fileName = fileName;
        this.downloadTime = LocalDateTime.now();
    }

}
