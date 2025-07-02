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
@Table(name = "servicies")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Serviceing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToMany(mappedBy = "services", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Place> places;

    public Serviceing(Integer id, String name, Set<Place> places) {
        this.id = id;
        this.name = name;
        this.places = places;

    }
}
