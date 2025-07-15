package com.plateform.restfinder.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plateform.restfinder.model.Place;
import com.plateform.restfinder.repository.PlaceRepository;

@Service
public class PlaceService {

    @Autowired
    PlaceRepository placeRepository;

    public List<Place> findAll() {
        return placeRepository.findAll();
    }

    public List<Place> findByProvince(String province) {
        return placeRepository.findPlacesByProvinceEquals(province);
    }

    public Optional<Place> findById(String id) {
        return placeRepository.findById(id);
    }

    public Place create(Place place) {
        return placeRepository.save(place);
    }

    public Place edit(Place place) {
        return placeRepository.save(place);
    }

    public void deleteById(String id) {
        placeRepository.deleteById(id);
    }

    public List<Place> findPlacesWithinRadius(Double latitude, Double longitude, Double radiusKm) {

        Double radiusMeters = radiusKm * 1000;

        return placeRepository.findPlacesWithinRadius(latitude, longitude, radiusMeters);
    }
}
