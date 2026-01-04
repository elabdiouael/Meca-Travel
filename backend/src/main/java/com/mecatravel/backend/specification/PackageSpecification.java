package com.mecatravel.backend.specification;

import com.mecatravel.backend.dto.PackageSearchCriteria;
import com.mecatravel.backend.entity.Hotel;
import com.mecatravel.backend.entity.PackageOption;
import com.mecatravel.backend.entity.TravelPackage;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class PackageSpecification {

    public static Specification<TravelPackage> getPackagesByCriteria(PackageSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Filter by Type (Hajj / Omra)
            if (criteria.getType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("type"), criteria.getType()));
            }

            // 2. Filter by Date (Depart mn had date lfouq)
            if (criteria.getStartDate() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("departureDate"), criteria.getStartDate()));
            }

            // 3. Filter by Active (Par défaut njibo ghir active)
            if (criteria.getActiveOnly() != null && criteria.getActiveOnly()) {
                predicates.add(criteriaBuilder.isTrue(root.get("isActive")));
            }

            // 4. Filter by Price (COMPLEXE: Khassna n-choufo Options)
            if (criteria.getMinPrice() != null || criteria.getMaxPrice() != null) {
                // Join m3a table Options
                Join<TravelPackage, PackageOption> optionsJoin = root.join("options");

                if (criteria.getMinPrice() != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(optionsJoin.get("pricePerPerson"), criteria.getMinPrice()));
                }
                if (criteria.getMaxPrice() != null) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(optionsJoin.get("pricePerPerson"), criteria.getMaxPrice()));
                }
            }

            // 5. Filter by Destination (Hotel City)
            if (criteria.getDestination() != null && !criteria.getDestination().isEmpty()) {
                // Join m3a table Hotels
                Join<TravelPackage, Hotel> hotelsJoin = root.join("hotels");
                // Like %MAKKAH%
                predicates.add(criteriaBuilder.like(criteriaBuilder.upper(hotelsJoin.get("city")), "%" + criteria.getDestination().toUpperCase() + "%"));
            }

            // DISTINCT (Bach ila package 3ndo 2 options may-tle3ch doublé)
            query.distinct(true);

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}