package com.plateform.restfinder.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Schema(description = "id del database")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "id del luogo a cui questa foto è collegata")
    @ManyToOne
    @JoinColumn(name = "place_id")
    @JsonBackReference
    private Place place;

    @Schema(description = "id di google della foto")
    @Column(length = 500)
    private String photoReference;

    @Schema(description = "nome del file salvato nell'archivio")
    private String fileName;

    private String contentType;

    @Schema(description = "perscorso del file")
    private String filePath;

    @Schema(description = "momento di creazione")
    private LocalDateTime createdAt;

    public Photo(Place place, String photoReference, String fileName) {
        this.place = place;
        this.photoReference = photoReference;
        this.fileName = fileName;
        this.createdAt = LocalDateTime.now();
    }

}
