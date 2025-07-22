package com.plateform.restfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentOptions {

    private Boolean acceptsDebitCards;
    private Boolean acceptCashOnly;
    private Boolean acceptsNfc;
}
