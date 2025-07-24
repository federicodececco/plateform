package com.plateform.restfinder.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.plateform.restfinder.model.Place;
import com.plateform.restfinder.repository.PlaceRepository;
import com.plateform.restfinder.specifications.PlaceSpecifications;

@Service
public class PlaceService {

    @Autowired
    PlaceRepository placeRepository;

    public List<Place> findAll() {
        return placeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Place> findByProvince(String province) {
        return placeRepository.findPlacesByProvinceEqualsNotBlacklisted(province);
    }

    @Transactional(readOnly = true)
    public List<Place> findByRegion(String region) {
        return placeRepository.findPlacesByRegionEqualsNotBlacklisted(region);
    }

    @Transactional(readOnly = true)
    public Optional<Place> findById(String id) {
        return placeRepository.findByIdRelations(id);
    }

    @Transactional(readOnly = true)
    public Place create(Place place) {
        return placeRepository.save(place);
    }

    @Transactional(readOnly = true)
    public Place edit(Place place) {
        return placeRepository.save(place);
    }

    public void trueDeleteById(String id) {
        placeRepository.deleteById(id);
    }

    public void falseDeleteById(String id) {
        placeRepository.softDeleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Place> findPlacesWithinRadius(Double latitude, Double longitude, Double radiusKm) {

        Double radiusMeters = radiusKm * 1000;

        return placeRepository.findPlacesWithinRadius(latitude, longitude, radiusMeters);
    }

    public Page<Place> search(String query, int page, int size) {
        if (query == null || query.trim().isEmpty()) {
            return Page.empty();
        }

        String cleanQuery = query.trim();
        Pageable pageable = PageRequest.of(page, size);

        if (cleanQuery.contains(" ")) {
            String[] words = cleanQuery.split("\\s+");
            StringBuilder booleanQuery = new StringBuilder();

            for (String word : words) {
                if (word.length() >= 3) {
                    if (booleanQuery.length() > 0) {
                        booleanQuery.append(" ");
                    }
                    booleanQuery.append("+").append(word).append("*");
                }
            }

            if (booleanQuery.length() == 0) {
                return searchAndLoadRelations(cleanQuery, PageRequest.of(page, size));
            }

            return searchAndLoadRelations(booleanQuery.toString(), PageRequest.of(page, size));
        } else {
            return searchAndLoadRelations(cleanQuery, PageRequest.of(page, size));
        }
    }

    @Transactional(readOnly = true)
    private Page<Place> searchAndLoadRelations(String searchTerm, Pageable pageable) {
        // Prima query: ottieni i risultati con ranking
        Page<Place> searchResults = placeRepository.searchWithRanking(searchTerm, pageable);

        // Se non ci sono risultati, restituisci pagina vuota
        if (searchResults.getContent().isEmpty()) {
            return searchResults;
        }

        // Estrai gli ID dei Place trovati
        List<String> placeIds = new ArrayList<>();
        for (Place place : searchResults.getContent()) {
            placeIds.add(place.getId());
        }

        // Seconda query: carica i Place con le relazioni
        List<Place> placesWithRelations = placeRepository.findByIdInWithRelations(placeIds);

        // Crea una mappa per accesso rapido
        Map<String, Place> placeMap = new HashMap<>();
        for (Place place : placesWithRelations) {
            placeMap.put(place.getId(), place);
        }

        // Mantieni l'ordine originale del ranking
        List<Place> orderedPlaces = new ArrayList<>();
        for (Place originalPlace : searchResults.getContent()) {
            Place placeWithRelations = placeMap.get(originalPlace.getId());
            if (placeWithRelations != null) {
                orderedPlaces.add(placeWithRelations);
            }
        }

        // Crea una nuova Page con i Place ordinati e le relazioni caricate
        return new PageImpl<>(orderedPlaces, pageable, searchResults.getTotalElements());
    }

    @Transactional(readOnly = true)

    public Page<Place> filter(String category, List<String> tags, String priceRange, Integer rating,
            int page, int size) {

        Specification<Place> spec = PlaceSpecifications.buildFilterSpecification(
                category, tags, priceRange, rating);

        Pageable pageable = PageRequest.of(page, size,
                Sort.by("rating").descending().and(Sort.by("name")));

        return placeRepository.findAll(spec, pageable);
    }

    public Page<Place> search(String query, int page) {
        return search(query, page, 10);
    }
}
