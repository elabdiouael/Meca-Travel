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
import java.util.ArrayList;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner commandLineRunner(
            PackageRepository packageRepository,
            HotelRepository hotelRepository,
            UserRepository userRepository
    ) {
        return args -> {
            // N-mss7o data l9dima bach t-t3awd t-bna b tswar jdad (Optional, walakin mzyan f Dev)
            // packageRepository.deleteAll();
            // hotelRepository.deleteAll();

            if (packageRepository.count() == 0) {
                // 1. Hotels
                Hotel hilton = new Hotel();
                hilton.setName("Hilton Suites Makkah");
                hilton.setCity("MAKKAH");
                hilton.setStars(5);
                hilton.setDistanceFromHaram("50m");
                // Tswira Makkah
                hilton.setMainImageUrl("https://images.unsplash.com/photo-1565552629477-e254f3a367c9?q=80&w=1000&auto=format&fit=crop");
                hilton.setImageUrls(List.of(
                        "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1000",
                        "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000"
                ));

                Hotel movenpick = new Hotel();
                movenpick.setName("Anwar Al Madinah");
                movenpick.setCity("MADINA");
                movenpick.setStars(5);
                movenpick.setDistanceFromHaram("100m");
                // Tswira Madina
                movenpick.setMainImageUrl("https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop");

                hotelRepository.saveAll(List.of(hilton, movenpick));

                // 2. Offre Omra
                TravelPackage omra = new TravelPackage();
                omra.setTitle("Omra Ramadan 2025 - VIP");
                omra.setDescription("Profitez d'une Omra spirituelle inoubliable avec un accompagnement religieux complet et des hôtels 5 étoiles face au Haram.");
                omra.setType(PackageType.OMRA);
                omra.setDepartureDate(LocalDate.of(2025, 3, 1));
                omra.setReturnDate(LocalDate.of(2025, 3, 15));
                omra.setActive(true);
                omra.setHotels(List.of(hilton, movenpick));

                // Images & Branding
                omra.setMainImageUrl("https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1000&auto=format&fit=crop");
                omra.setAirlineName("Royal Air Maroc");
                omra.setAirlineLogoUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Royal_Air_Maroc_logo.svg/2560px-Royal_Air_Maroc_logo.svg.png");
                omra.setGuideName("Cheikh Omar Penja");

                // Features
                omra.setFeatures(List.of(
                        "Vol Direct Casablanca - Jeddah (RAM)",
                        "Visa Omra Incluse",
                        "Hôtels 5★ avec Petit Déjeuner",
                        "Transferts en Bus VIP Climatisé",
                        "Ziyara Mazarat (Makkah & Madina)",
                        "Accompagnement Religieux 24/7"
                ));

                // 3. Itinerary (Programme)
                PackageItinerary day1 = new PackageItinerary();
                day1.setDayNumber(1);
                day1.setTitle("Départ du Maroc");
                day1.setDescription("Rassemblement à l'aéroport Mohammed V à 10h00. Enregistrement des bagages et vol direct vers Jeddah.");
                day1.setTravelPackage(omra);

                PackageItinerary day2 = new PackageItinerary();
                day2.setDayNumber(2);
                day2.setTitle("Arrivée & Omra");
                day2.setDescription("Arrivée à Jeddah. Transfert vers l'hôtel à Makkah. Installation, repos, puis accomplissement de la Omra en groupe.");
                day2.setTravelPackage(omra);

                PackageItinerary day3 = new PackageItinerary();
                day3.setDayNumber(3);
                day3.setTitle("Journée Libre & Ibadah");
                day3.setDescription("Journée consacrée aux prières au Haram, lecture du Coran et tawaf.");
                day3.setTravelPackage(omra);

                PackageItinerary day4 = new PackageItinerary();
                day4.setDayNumber(4);
                day4.setTitle("Ziyara Makkah");
                day4.setDescription("Visite des lieux saints: Mont Arafat, Mina, Muzdalifah et Jabal Al-Nour.");
                day4.setTravelPackage(omra);

                omra.setItinerary(List.of(day1, day2, day3, day4));

                // 4. PRICING OPTIONS
                PackageOption optQuad = new PackageOption();
                optQuad.setRoomType(RoomType.QUADRUPLE);
                optQuad.setPricePerPerson(BigDecimal.valueOf(14500));
                optQuad.setTravelPackage(omra);

                PackageOption optTriple = new PackageOption();
                optTriple.setRoomType(RoomType.TRIPLE);
                optTriple.setPricePerPerson(BigDecimal.valueOf(16500));
                optTriple.setTravelPackage(omra);

                PackageOption optDouble = new PackageOption();
                optDouble.setRoomType(RoomType.DOUBLE);
                optDouble.setPricePerPerson(BigDecimal.valueOf(18900));
                optDouble.setTravelPackage(omra);

                omra.setOptions(List.of(optQuad, optTriple, optDouble));

                // Save Everything
                packageRepository.save(omra);

                System.out.println("✅ Data Seeding Complet: Omra Ramadan ajoutée avec succès !");
            }
        };
    }
}