package com.plateform.restfinder.security;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    /*
     * crea una chiave segreta per la generazione e certificazione dei JWT
     * attraverso l'algoritmo HmacSHA256 codificandola in Base64
     * è probabilmente ecessivo per le esigenze attuali ma rimane best practice
     * public JWTService() {
     * 
     * try {
     * KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
     * SecretKey sk = keyGen.generateKey();
     * secretkey = Base64.getEncoder().encodeToString(sk.getEncoded());
     * } catch (NoSuchAlgorithmException e) {
     * throw new RuntimeException(e);
     * }
     * }
     * 
     * l'utilizzo di default qua implementato reperisce la secret key fissa da
     * application properties
     */
    @Value("${jwt.secret}")
    private String secretKey;

    /*
     * funzione che crea il token, aggiungendo una mappa di claims, ovvero
     * informazioni, trasmissibili attraverso il token, attualemente sono vuoti,
     * in futuro utilizzabili per ruoli
     * aggiunge la chiave e dà al token una validità di 20 min
     */
    public String generateToken(String username) {

        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 20 * 60 * 1000))
                .and()
                .signWith(getKey())
                .compact();

    }

    /*
     * ritorna la chivae segreta codificandola
     */
    private SecretKey getKey() {
        String key = secretKey;
        return Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
    }

    /* ritorna lo user associato al token */
    public String extractUserName(String token) {

        return extractClaim(token, Claims::getSubject);
    }

    /* ritorna il valore di una claim particolare */
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    /* ritorna il valore di tutte le claim */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /* valida il token */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    /*
     * eventuale logica per aggiungere dei token ad una blacklist in caso
     * sia necessario per ragioni di sicurezza, necessita di implementazione
     * attraverso db
     * 
     * private Set<String> blacklistedTokens = new HashSet<>();
     * 
     * public void blacklistToken(String token) {
     * blacklistedTokens.add(token);
     * }
     */

}
