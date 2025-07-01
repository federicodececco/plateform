package com.plateform.restfinder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plateform.restfinder.model.Place;

public interface PlaceRepository extends JpaRepository<Place, Long> {

}
