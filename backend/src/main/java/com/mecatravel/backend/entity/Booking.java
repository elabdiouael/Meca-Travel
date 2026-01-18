package com.mecatravel.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    private LocalDateTime bookingDate = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER) // FIX: Eager bach yjib l-option dima
    @JoinColumn(name = "option_id")
    // FIX: Nsa 'travelPackage' hna bach yban f Dashboard, walakin ignoré proxies
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private PackageOption packageOption;

    @ManyToOne
    @JoinColumn(name = "user_id")
    // FIX: Ignorer user details bach mayt9lch l-response (Dashboard kayhtaj ghir email li deja f booking)
    @JsonIgnoreProperties({"password", "bookings", "hibernateLazyInitializer", "handler"})
    private User user;
}