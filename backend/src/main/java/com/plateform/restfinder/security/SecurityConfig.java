package com.plateform.restfinder.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationWebFilter jwtAuthenticationWebFilter;

    @Autowired
    private ReactiveUserDetailsService userDetailsService;

    /*
     * logica di protezione dell'applicazione,
     * tutte le chiamate GET, fatta eccezione per quelle google places,
     * sono aperte, le altre richiedono autenticazione, questa situzione non
     * dovrebbe
     * mai verificarsi, in quanto anche il client è protetto, ma a differenza del
     * server, è soggetto a possibili
     * interferenze malevole da parte di utenti
     */
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/api/auth/login").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/places/google-search-text").authenticated()
                        .pathMatchers(HttpMethod.GET, "/api/places/google-details/{id}").authenticated()
                        .pathMatchers(HttpMethod.GET, "/**").permitAll()
                        .anyExchange().authenticated())
                .addFilterBefore(jwtAuthenticationWebFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .build();
    }

    /*
     * autentication manager per la gestione del token, impostato senza password, in
     * quanto, per ora la password admin è salvata in db in plain text
     */
    @Bean
    public ReactiveAuthenticationManager reactiveAuthenticationManager() {
        UserDetailsRepositoryReactiveAuthenticationManager authManager = new UserDetailsRepositoryReactiveAuthenticationManager(
                userDetailsService);
        authManager.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
        return authManager;
    }

    /*
     * configurazione di default del cors, da modificare quando deployata
     * ora in numerosi campi sovrascritta dai singoli controller
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:*", "http://127.0.0.1:*"));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        configuration.setAllowedHeaders(Arrays.asList("*"));

        configuration.setAllowCredentials(true);

        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);

        return source;
    }

}
