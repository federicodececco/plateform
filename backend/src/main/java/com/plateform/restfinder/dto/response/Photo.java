package com.plateform.restfinder.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Photo {

    private String name;
    private Integer widthPx;
    private Integer heightPx;
    private List<AuthorAtb> authorAttributions;
    private String flagContentUri;
    private String googleMapsUri;

}
