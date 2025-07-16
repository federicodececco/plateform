package com.plateform.restfinder.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlacesResponseList {
    @JsonProperty("places")
    private List<PlaceResponse> places;

}
