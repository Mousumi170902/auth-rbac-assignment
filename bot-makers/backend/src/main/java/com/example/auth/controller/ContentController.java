package com.example.auth.controller;

import com.example.auth.dto.ContentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Tag(name = "Content", description = "Protected content endpoints with role-based access")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ContentController {

    @GetMapping("/public/content")
    @Operation(summary = "Get public content", description = "Anyone can access this endpoint")
    public ResponseEntity<ContentResponse> getPublicContent() {
        ContentResponse response = ContentResponse.builder()
                .message("Welcome to Public Content")
                .content("This is public information available to everyone without authentication.")
                .accessLevel("PUBLIC")
                .build();
        return ResponseEntity.ok(response);
    }

    
    @GetMapping("/user/content")
    @PreAuthorize("hasRole('USER')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get user content", description = "Only users with USER role can access this endpoint")
    public ResponseEntity<ContentResponse> getUserContent() {
        ContentResponse response = ContentResponse.builder()
                .message("Welcome to User Content")
                .content("This content is exclusive to registered users. You can view your profile, personal data, and user-level features.")
                .accessLevel("USER")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/content")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get admin content", description = "Only users with ADMIN role can access this endpoint")
    public ResponseEntity<ContentResponse> getAdminContent() {
        ContentResponse response = ContentResponse.builder()
                .message("Welcome to Admin Content")
                .content("This is confidential admin content. You have access to system management, user administration, and analytics.")
                .accessLevel("ADMIN")
                .build();
        return ResponseEntity.ok(response);
    }

}
