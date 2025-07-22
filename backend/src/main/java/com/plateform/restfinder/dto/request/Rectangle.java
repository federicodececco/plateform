package com.plateform.restfinder.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rectangle {

    private Coordinates highPoint;

    private Coordinates lowPoint;

}
