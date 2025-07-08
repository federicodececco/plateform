package com.plateform.restfinder.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String googleName;

    private String enName;

    private String itName;

    private Boolean isVisible;

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
