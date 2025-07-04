package com.plateform.restfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessibilityOptions {

    private Boolean wheelchairAccessibleRestroom;
    private Boolean wheelchairAccessibleEntrance;
    private Boolean wheelchairAccessibleSeating;
    private Boolean wheelchairAccessibleParking;

}
