package com.mecatravel.backend.controller;

import com.mecatravel.backend.entity.Booking;
import com.mecatravel.backend.entity.PackageOption;
import com.mecatravel.backend.entity.User; // Import User
import com.mecatravel.backend.enums.BookingStatus;
import com.mecatravel.backend.repository.BookingRepository;
import com.mecatravel.backend.repository.PackageOptionRepository;
import com.mecatravel.backend.repository.UserRepository; // Import Repo
import com.mecatravel.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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

    @Autowired
    private UserRepository userRepository; // HNA L-FIX: Injectina UserRepo

    // 1. (POST) Client kay-reserver
    @PostMapping("/{optionId}")
    public Booking createBooking(@RequestBody Booking booking, @PathVariable Long optionId, Authentication authentication) {

        // 1. Jib Option
        PackageOption option = optionRepository.findById(optionId)
                .orElseThrow(() -> new RuntimeException("Option Introuvable !"));
        booking.setPackageOption(option);

        // 2. HNA L-FIX: Jib User mn Token w lsse9o f Booking
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = userRepository.findByEmail(userDetails.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            booking.setUser(user); // Lsse9na User
        }

        // 3. Set Status
        if (booking.getStatus() == null) {
            booking.setStatus(BookingStatus.PENDING);
        }

        return bookingRepository.save(booking);
    }

    // 2. (GET) Admin ychouf koulchi
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // 3. (GET) Client ychouf dyalo
    @GetMapping("/my-bookings")
    public List<Booking> getMyBookings(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        // Hna kan-3iyto l methode li f Repository
        return bookingRepository.findByUser_Email(userDetails.getEmail());
    }

    // 4. (PUT) Admin change status
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestParam BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);
        bookingRepository.save(booking);

        return ResponseEntity.ok("Status mis à jour avec succès !");
    }
}