package com.plateform.restfinder.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JwtAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;

    public JwtAuthResponse(String accessToken, String username) {
        this.accessToken = accessToken;
        this.username = username;

    }
}