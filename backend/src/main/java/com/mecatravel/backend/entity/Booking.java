package com.mecatravel.backend.entity;

import com.mecatravel.backend.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientName;
    private String phoneNumber;
    private String email;
    private int numberOfPeople;

    // HNA L-CHANGEMENT: Status Enum
    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    private LocalDateTime bookingDate = LocalDateTime.now();

    // HNA L-CHANGEMENT: L-Client kay-khtar Option (Ex: Omra b Chambre Double)
    @ManyToOne
    @JoinColumn(name = "option_id")
    private PackageOption packageOption;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}