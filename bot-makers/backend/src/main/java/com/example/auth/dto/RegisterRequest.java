package com.example.auth.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private String role; 

}
