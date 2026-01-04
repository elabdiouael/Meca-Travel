package com.mecatravel.backend.controller;

import com.mecatravel.backend.dto.PackageSearchCriteria;
import com.mecatravel.backend.entity.PackageType;
import com.mecatravel.backend.entity.TravelPackage;
import com.mecatravel.backend.repository.PackageRepository;
import com.mecatravel.backend.specification.PackageSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin("*") // Bach Next.js y-connecta bla machakil
public class PackageController {

    @Autowired
    private PackageRepository repository;

    // 1. GET: Jib ga3 les offres (Simple)
    @GetMapping
    public List<TravelPackage> getAllPackages() {
        return repository.findAll();
    }

    // 2. GET: Jib ghir b Type (Filter simple f URL: ?type=OMRA)
    @GetMapping("/filter")
    public List<TravelPackage> getPackagesByType(@RequestParam PackageType type) {
        return repository.findByType(type);
    }

    // 3. POST: ADVANCED SEARCH (Hada howa l-M3a9oul 🔍)
    // Body: { "minPrice": 1000, "destination": "Makkah", "type": "OMRA" }
    @PostMapping("/search")
    public List<TravelPackage> searchPackages(@RequestBody PackageSearchCriteria criteria) {
        // Convertir Criteria -> SQL dynamique
        Specification<TravelPackage> spec = PackageSpecification.getPackagesByCriteria(criteria);
        
        // Executer la recherche
        return repository.findAll(spec);
    }

    // 4. POST: Admin kay-zid offre jdida
    @PostMapping
    public TravelPackage createPackage(@RequestBody TravelPackage travelPackage) {
        return repository.save(travelPackage);
    }
}