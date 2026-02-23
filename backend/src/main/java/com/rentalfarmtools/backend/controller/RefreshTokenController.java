package com.rentalfarmtools.backend.controller;

import com.rentalfarmtools.backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class RefreshTokenController {

    private final JwtUtil jwtUtil;

    public RefreshTokenController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        if (refreshToken == null || refreshToken.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Refresh token is required"));
        }

        try {
            if (jwtUtil.validateToken(refreshToken)) {
                String email = jwtUtil.extractEmail(refreshToken);
                String newAccessToken = jwtUtil.generateAccessToken(email); // short-lived access token
                return ResponseEntity.ok(Map.of("token", newAccessToken));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid or expired refresh token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token validation failed: " + e.getMessage()));
        }
    }
}
