package com.mecatravel.backend.repository;

import com.mecatravel.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Fonction bach n-l9aw user b l-Email (Mouhimma l Login)
    Optional<User> findByEmail(String email);

    // Check wach email deja kayn (bach man-crééwch joj b nefs email)
    boolean existsByEmail(String email);
}