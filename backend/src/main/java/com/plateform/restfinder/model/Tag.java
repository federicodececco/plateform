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
@Table(name = "tags")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String googleName;

    private String enName;

    private String itName;

    // do we care about this tag?
    private Boolean isVisible;

    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Place> places;

    public Tag(Integer id, String googleName, Set<Place> places, String enName, String itName, Boolean isVisible) {
        this.id = id;
        this.enName = enName;
        this.itName = itName;
        this.places = places;
        this.isVisible = isVisible;
        this.googleName = googleName;
    }
}
