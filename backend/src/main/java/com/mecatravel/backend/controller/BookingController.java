package com.mecatravel.backend.controller;

import com.mecatravel.backend.entity.Booking;
import com.mecatravel.backend.entity.PackageOption;
import com.mecatravel.backend.enums.BookingStatus;
import com.mecatravel.backend.repository.BookingRepository;
import com.mecatravel.backend.repository.PackageOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PackageOptionRepository optionRepository;

    // 1. (POST) Client kay-reserver OPTION (Ex: Omra - Chambre Quadruple)
    // Note: Daba kantsifto ID dyl Option machi Package
    @PostMapping("/{optionId}")
    public Booking createBooking(@RequestBody Booking booking, @PathVariable Long optionId) {

        // N-l9aw l-Option li khtar l-client
        PackageOption option = optionRepository.findById(optionId)
                .orElseThrow(() -> new RuntimeException("Option Introuvable !"));

        // Linker Booking m3a Option
        booking.setPackageOption(option);

        // Par défaut Status huwa PENDING (mn Entity), walakin n2akdouha hna
        if (booking.getStatus() == null) {
            booking.setStatus(BookingStatus.PENDING);
        }

        return bookingRepository.save(booking);
    }

    // 2. (GET) Admin ychouf les reservations
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}