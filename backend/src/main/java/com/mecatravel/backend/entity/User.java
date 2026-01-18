package com.mecatravel.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore; // Import
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    // HNA L-FIX: Zidna @JsonIgnore bach maybanche l-password f JSON response
    @JsonIgnore
    private String password;

    private String role; // "ROLE_ADMIN" or "ROLE_CLIENT"
}