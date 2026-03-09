package com.example.auth.config;

import com.example.auth.entity.Role;
import com.example.auth.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Seeds the roles table on startup if roles don't exist yet.
 * Without this, register requests fail with "Role not found".
 */
@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName("USER").isEmpty()) {
                roleRepository.save(Role.builder()
                        .name("USER")
                        .description("Standard user role")
                        .build());
            }
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                roleRepository.save(Role.builder()
                        .name("ADMIN")
                        .description("Administrator role")
                        .build());
            }
        };
    }
}
