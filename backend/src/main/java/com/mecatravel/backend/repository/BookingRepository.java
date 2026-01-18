package com.mecatravel.backend.repository;

import com.mecatravel.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByPhoneNumber(String phoneNumber);

    List<Booking> findByStatus(String status);

    // HNA L-FIX: Zidna underscore (_) bach n-specifiw l-field 'email' wst 'user'
    List<Booking> findByUser_Email(String email);
}