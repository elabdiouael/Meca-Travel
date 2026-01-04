package com.mecatravel.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "hotels")
@Data
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city; // "MAKKAH" or "MADINA"
    private int stars; // 3, 4, 5
    private String distanceFromHaram; // ex: "500m"

    // Relation Inverse (Optional, ghi bach Hibernate yfhem)
    @ManyToMany(mappedBy = "hotels")
    @JsonIgnore
    private List<TravelPackage> packages;
}