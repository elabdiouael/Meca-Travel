package com.mecatravel.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

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

    // HNA L-CHANGEMENT: 7iyydna 'price' fix, zedna Options
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