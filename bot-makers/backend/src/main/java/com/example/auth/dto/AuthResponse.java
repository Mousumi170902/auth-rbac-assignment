package com.example.auth.dto;

import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String type;
    private Long id;
    private String name;
    private String email;
    private String role;

}
