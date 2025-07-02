package com.plateform.restfinder.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationBias {

    private Circle circle;
    private Rectangle rectangle;

}
