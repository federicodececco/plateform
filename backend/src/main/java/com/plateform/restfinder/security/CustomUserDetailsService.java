package com.plateform.restfinder.security;

import com.plateform.restfinder.model.User;
import com.plateform.restfinder.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

            // Debug logging
            System.out.println("Loaded user: " + user.getUsername());
            System.out.println("User roles size: " + (user.getRoles() != null ? user.getRoles().size() : "null"));

            if (user.getRoles() != null) {
                user.getRoles().forEach(role -> System.out.println("Role: " + role.getName()));
            }

            return new DatabaseUserDetails(user);
        } catch (Exception e) {
            System.err.println("Error loading user: " + e.getMessage());
            e.printStackTrace();
            throw new UsernameNotFoundException("Error loading user: " + username, e);
        }
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);

        return new DatabaseUserDetails(user.get());
    }
}