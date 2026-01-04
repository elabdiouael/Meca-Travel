package com.mecatravel.backend.entity;

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

    // --- NEW FIELDS ---

    // 1. IMAGES
    private String mainImageUrl; // Tswira l-kbira d l-offre

    @ElementCollection
    @CollectionTable(name = "package_images", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "image_url")
    private List<String> imageUrls = new ArrayList<>();

    // 2. AIRLINE INFO
    private String airlineName; // Ex: "Turkish Airlines"
    private String airlineLogoUrl; // Lien logo

    // 3. GUIDE (Murchid)
    private String guideName; // Ex: "Cheikh Ahmed"
    // (Ila bghiti tswira d guide t9der tzidha hna: private String guideImageUrl;)

    // 4. INCLUSIONS (Services)
    @ElementCollection
    @CollectionTable(name = "package_features", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "feature")
    private List<String> features = new ArrayList<>(); // Ex: ["Visa", "Vol Direct"]

    // 5. ITINERARY (Programme)
    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
    private List<PackageItinerary> itinerary = new ArrayList<>();

    // --- EXISTING FIELDS ---

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL)
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