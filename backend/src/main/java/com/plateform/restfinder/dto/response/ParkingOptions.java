package com.plateform.restfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParkingOptions {

    private Boolean paidParkingLot;
    private Boolean paidStreetParking;

}