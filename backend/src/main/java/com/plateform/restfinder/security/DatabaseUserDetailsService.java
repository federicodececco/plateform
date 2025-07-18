package com.plateform.restfinder.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.plateform.restfinder.model.User;
import com.plateform.restfinder.repository.UserRepository;

public class DatabaseUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optUser = userRepository.findByUsername(username);
        if (optUser.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return new DatabaseUserDetails(optUser.get());
    }

}
