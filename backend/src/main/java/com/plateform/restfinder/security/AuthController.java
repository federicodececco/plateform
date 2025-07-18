package com.plateform.restfinder.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plateform.restfinder.security.dto.JWTresponse;
import com.plateform.restfinder.security.dto.LoginRequest;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTservice jwTservice;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwTservice.generateToken(userDetails);

            return ResponseEntity.ok(new JWTresponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

}
