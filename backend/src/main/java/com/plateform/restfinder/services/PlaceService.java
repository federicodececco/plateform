package com.plateform.restfinder.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    public List<Place> findByProvince(String province) {
        return placeRepository.findPlacesByProvinceEqualsNotBlacklisted(province);
    }

    public Optional<Place> findById(String id) {
        return placeRepository.findByIdRelations(id);
    }

    public Place create(Place place) {
        return placeRepository.save(place);
    }

    public Place edit(Place place) {
        return placeRepository.save(place);
    }

    public void trueDeleteById(String id) {
        placeRepository.deleteById(id);
    }

    public void falseDeleteById(String id) {
        placeRepository.softDeleteById(id);
    }

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
                return placeRepository.searchWithRanking(cleanQuery, PageRequest.of(page, size));
            }

            return placeRepository.searchWithRanking(booleanQuery.toString(), PageRequest.of(page, size));
        } else {

            return placeRepository.searchWithRanking(cleanQuery, PageRequest.of(page, size));
        }
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
