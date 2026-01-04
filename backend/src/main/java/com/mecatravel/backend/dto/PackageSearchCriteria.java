package com.mecatravel.backend.dto;

import com.mecatravel.backend.entity.PackageType;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class PackageSearchCriteria {
    // Koulchi optionnel (n9dro n-sifto null)
    private String destination; // Ex: "MAKKAH" (ghadi n-9elbo f hotels)
    private PackageType type;   // HAJJ ola OMRA
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private LocalDate startDate; // Safar mn had tarikh lfouq
    private Boolean activeOnly;  // Wach njibo ghir l-active
}