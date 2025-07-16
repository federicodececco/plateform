package com.plateform.restfinder.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorAtb {

    private String displayName;
    private String uri;
    private String photoUri;

}
