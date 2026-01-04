package com.mecatravel.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mecatravel.backend.enums.RoomType;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "package_options")
@Data
public class PackageOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoomType roomType; // QUAD, DOUBLE...

    private BigDecimal pricePerPerson; // Taman lwahed

    @ManyToOne
    @JoinColumn(name = "package_id")
    @JsonIgnore // Bach ma ndkhlouch f boucle infini
    private TravelPackage travelPackage;
}