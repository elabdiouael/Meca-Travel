package com.mecatravel.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "package_itineraries")
@Data
public class PackageItinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int dayNumber; // Ex: 1, 2, 3...
    private String title;  // Ex: "Arrivée à Médine"

    @Column(columnDefinition = "TEXT")
    private String description; // Ex: "Rassemblement à l'aéroport..."

    @ManyToOne
    @JoinColumn(name = "package_id")
    @JsonIgnore // Bach ma ndkhlouch f boucle infini JSON
    private TravelPackage travelPackage;
}