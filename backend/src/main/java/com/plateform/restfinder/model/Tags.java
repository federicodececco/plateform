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
public class Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String en_name;

    private String it_name;

    // do we care about this tag?
    private Boolean isVisible;

    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Place> places;

    public Tags(Integer id, Set<Place> places, String en_name, String it_name, Boolean isVisible) {
        this.id = id;
        this.en_name = en_name;
        this.it_name = it_name;
        this.places = places;
        this.isVisible = isVisible;

    }
}
