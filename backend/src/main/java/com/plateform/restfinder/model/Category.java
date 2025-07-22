package com.plateform.restfinder.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@ToString

public class Category {

    @Schema(description = "id della categoria")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Schema(description = "nome dato da google alla categoria")
    private String googleName;

    @Schema(description = "nome in inglese della categoria")
    private String enName;

    @Schema(description = "nome in italiano della categoria")
    private String itName;

    @Schema(description = "valore booelano che controlla se la categoria va fatta vedere all'utente")
    private Boolean isVisible;

    @Schema(description = "array di locali collegati alla categoria")
    @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Place> places;

    public Category(Integer id, String googleName, String enName, String itName) {
        this.id = id;
        this.googleName = googleName;
        this.enName = enName;
        this.itName = itName;
        this.isVisible = true;
    }

}
