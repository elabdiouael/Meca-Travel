package com.mecatravel.backend.repository;

import com.mecatravel.backend.entity.TravelPackage;
import com.mecatravel.backend.entity.PackageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor; // Import Mohim
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<TravelPackage, Long>, JpaSpecificationExecutor<TravelPackage> {

    // Méthodes classiques (Simple SQL)
    List<TravelPackage> findByType(PackageType type);
    
    List<TravelPackage> findByIsActiveTrue();
    
    // Note: search(Specification) jat auto m3a JpaSpecificationExecutor
}