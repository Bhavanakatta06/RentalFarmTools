package com.rentalfarmtools.backend.security;

import com.rentalfarmtools.backend.model.User;
import com.rentalfarmtools.backend.repository.UserRepository;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String path = request.getServletPath();
        boolean skip = path.startsWith("/api/auth/");
        if (skip) {
            System.out.println("Skipping JWT filter for path: " + path);
        } else {
            System.out.println("Applying JWT filter for path: " + path);
        }
        return skip;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        System.out.println("JwtAuthenticationFilter invoked for: " + request.getServletPath());

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("Found Authorization header, token: " + token);

            try {
                String email = jwtUtil.extractEmail(token); 
                System.out.println("Extracted email from token: " + email);

                Optional<User> userOpt = userRepository.findByEmailIgnoreCase(email);

                if (userOpt.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null) {
                    User user = userOpt.get();
                    System.out.println("User found in DB: " + user.getEmail());

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    email, // ✅ principal is the email string
                                    null,
                                    Collections.singletonList(() -> "ROLE_USER")
                            );

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    System.out.println("SecurityContext updated with authenticated user: " + email);
    
                }
            } catch (Exception e) {
                System.out.println("Invalid token: " + e.getMessage());
            }
        } else {
            System.out.println("No Authorization header present");
        }

        filterChain.doFilter(request, response);
    }
}
