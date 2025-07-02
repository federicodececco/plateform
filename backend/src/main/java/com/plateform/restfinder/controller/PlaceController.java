package com.plateform.restfinder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateform.restfinder.dto.response.PlacesResponseList;
import com.plateform.restfinder.services.GooglePlacesService;
import com.plateform.restfinder.services.PlaceService;

import reactor.core.publisher.Mono;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @Autowired
    private GooglePlacesService googlePlacesService;

    @GetMapping("/search-text")
    public Mono<PlacesResponseList> searchText(@RequestParam String query,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude, @RequestParam(required = false) Double radius,
            @RequestParam(required = false) Integer maxResults) {
        return googlePlacesService.searchText(query, latitude, longitude, radius, maxResults);
    }

}
