package com.plateform.restfinder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateform.restfinder.dto.response.JwtAuthResponse;
import com.plateform.restfinder.model.User;
import com.plateform.restfinder.services.UserService;

import reactor.core.publisher.Mono;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public Mono<ResponseEntity<JwtAuthResponse>> login(@RequestBody User user) {
        return service.verify(user)
                .map(token -> {
                    if ("fail".equals(token)) {
                        JwtAuthResponse failResponse = new JwtAuthResponse();
                        failResponse.setAccessToken(token);
                        failResponse.setUsername(null);
                        return ResponseEntity.status(401).body(failResponse);
                    }
                    JwtAuthResponse res = new JwtAuthResponse(token, user.getUsername());

                    return ResponseEntity.ok(res);
                });
    }

}
