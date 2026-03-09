package com.example.auth.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentResponse {

    private String message;
    private String content;
    private String accessLevel;

}
