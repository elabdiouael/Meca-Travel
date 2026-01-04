package com.mecatravel.backend.repository;

import com.mecatravel.backend.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    // Exemple: Jib lia ga3 hotels li f Makkah
    List<Hotel> findByCity(String city);
}