package com.mecatravel.backend.repository;

import com.mecatravel.backend.entity.PackageOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageOptionRepository extends JpaRepository<PackageOption, Long> {
}