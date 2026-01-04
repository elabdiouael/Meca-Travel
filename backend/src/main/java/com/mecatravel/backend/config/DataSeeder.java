package com.mecatravel.backend.config;

import com.mecatravel.backend.entity.*;
import com.mecatravel.backend.enums.RoomType;
import com.mecatravel.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner commandLineRunner(
            PackageRepository packageRepository,
            HotelRepository hotelRepository,
            UserRepository userRepository
            // Note: Options kaysujlo rasshom auto m3a package (Cascade)
    ) {
        return args -> {
            if (packageRepository.count() == 0) {
                // 1. Hotels
                Hotel hilton = new Hotel();
                hilton.setName("Hilton Suites Makkah");
                hilton.setCity("MAKKAH");
                hilton.setStars(5);
                hilton.setDistanceFromHaram("50m");

                Hotel movenpick = new Hotel();
                movenpick.setName("Anwar Al Madinah");
                movenpick.setCity("MADINA");
                movenpick.setStars(5);
                movenpick.setDistanceFromHaram("100m");

                hotelRepository.saveAll(List.of(hilton, movenpick));

                // 2. Offre Omra
                TravelPackage omra = new TravelPackage();
                omra.setTitle("Omra Ramadan 2025");
                omra.setDescription("Voyage spirituel complet.");
                omra.setType(PackageType.OMRA);
                omra.setDepartureDate(LocalDate.of(2025, 3, 1));
                omra.setReturnDate(LocalDate.of(2025, 3, 15));
                omra.setActive(true);
                omra.setHotels(List.of(hilton, movenpick));

                // 3. PRICING OPTIONS (Hna L-Power!)
                PackageOption optQuad = new PackageOption();
                optQuad.setRoomType(RoomType.QUADRUPLE);
                optQuad.setPricePerPerson(BigDecimal.valueOf(1400));
                optQuad.setTravelPackage(omra);

                PackageOption optDouble = new PackageOption();
                optDouble.setRoomType(RoomType.DOUBLE);
                optDouble.setPricePerPerson(BigDecimal.valueOf(1800));
                optDouble.setTravelPackage(omra);

                omra.setOptions(List.of(optQuad, optDouble));

                // Save (Spring ghadi y-sauvgardi Package + Options dyalo d9a wehda)
                packageRepository.save(omra);

                System.out.println("✅ Data Seeding Updated: Options de prix ajoutées !");
            }
        };
    }
}