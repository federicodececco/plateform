package com.plateform.restfinder.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdressComponents {

    private String longText;
    private String shortText;
    private List<String> types;
    private String languageCode;

}
