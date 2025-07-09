package com.plateform.restfinder.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rating_ranges")
@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
public class RatingRange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Double max;

    private Double min;

    private Integer actualValue;

    @OneToMany(mappedBy = "ratingRange", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<Place> places;

}
