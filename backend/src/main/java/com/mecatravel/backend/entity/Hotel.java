package com.mecatravel.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;
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

    // --- NEW FIELDS (IMAGES) ---
    private String mainImageUrl; // Tswira l-kbira d l-hotel

    @ElementCollection
    @CollectionTable(name = "hotel_images", joinColumns = @JoinColumn(name = "hotel_id"))
    @Column(name = "image_url")
    private List<String> imageUrls = new ArrayList<>();

    // Relation Inverse
    @ManyToMany(mappedBy = "hotels")
    @JsonIgnore
    private List<TravelPackage> packages;
}