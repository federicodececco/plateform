package com.plateform.restfinder.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.plateform.restfinder.model.User;
import com.plateform.restfinder.repository.UserRepository;
import com.plateform.restfinder.security.JWTService;

import reactor.core.publisher.Mono;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    ReactiveAuthenticationManager manager;

    public Mono<String> verify(User user) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user.getUsername(),
                user.getPassword());

        return manager.authenticate(authToken)
                .map(authentication -> {
                    if (authentication.isAuthenticated()) {
                        return jwtService.generateToken(user.getUsername());
                    }
                    return "fail";
                })
                .onErrorReturn("fail");
    }
}