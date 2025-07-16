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
@Table(name = "tags")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Tag {

    @Schema(description = "id della risorsa")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Schema(description = "nome dato da google alla risorsa, solitamente in questo formato: nome_dato_da_google")
    private String googleName;

    @Schema(description = "nome in inglese della risorsa")
    private String enName;

    @Schema(description = "nome in italiano della risorsa")
    private String itName;

    @Schema(description = "valore booleano che controlla se un tag è da mostrare all'utente ")
    // do we care about this tag?
    private Boolean isVisible;

    @Schema(description = "array di locali connessi a questo tag")
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
