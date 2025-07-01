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

    public Optional<Place> findById(Long id) {
        return placeRepository.findById(id);
    }

    public Place create(Place place) {
        return placeRepository.save(place);
    }

    public Place edit(Place place) {
        return placeRepository.save(place);
    }

    public void deleteById(Long id) {
        placeRepository.deleteById(id);
    }
}
