package com.mecatravel.backend.repository;

import com.mecatravel.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Jib bookings dyl wahed nmra (Ila bgha l-client ychouf dossier dyalo)
    List<Booking> findByPhoneNumber(String phoneNumber);

    // Jib bookings b Status (ex: PENDING bach t-traitihom)
    List<Booking> findByStatus(String status);
}