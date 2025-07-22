package com.plateform.restfinder.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TextRequest {

    private String textQuery;
    private String languageCode;
    private String regionCode;
    private Integer maxResultCount;
    private LocationBias locationBias;
    private LocationRestriction locationRestriction;

}
