package com.mecatravel.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // Import Jdid
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "packages")
@Data
public class TravelPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    // IMAGES
    private String mainImageUrl;

    @ElementCollection
    @CollectionTable(name = "package_images", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "image_url")
    private List<String> imageUrls = new ArrayList<>();

    // AIRLINE INFO
    private String airlineName;
    private String airlineLogoUrl;

    // GUIDE
    private String guideName;

    // INCLUSIONS
    @ElementCollection
    @CollectionTable(name = "package_features", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "feature")
    private List<String> features = new ArrayList<>();

    // ITINERARY
    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
    private List<PackageItinerary> itinerary = new ArrayList<>();

    // OPTIONS
    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
    // HNA L-FIX: Bach ma-ndkhlouch f boucle (Package -> Option -> Package...)
    @JsonIgnoreProperties("travelPackage")
    private List<PackageOption> options;

    private LocalDate departureDate;
    private LocalDate returnDate;

    @Enumerated(EnumType.STRING)
    private PackageType type;

    private boolean isActive;

    @ManyToMany
    @JoinTable(
            name = "package_hotels",
            joinColumns = @JoinColumn(name = "package_id"),
            inverseJoinColumns = @JoinColumn(name = "hotel_id")
    )
    private List<Hotel> hotels;
}