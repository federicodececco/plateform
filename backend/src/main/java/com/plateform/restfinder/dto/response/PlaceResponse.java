package com.plateform.restfinder.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlaceResponse {

    private String name;
    private String id;
    private List<String> types;
    private String formattedAddress;

}
