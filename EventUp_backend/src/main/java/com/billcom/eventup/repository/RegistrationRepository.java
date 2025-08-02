package com.billcom.eventup.repository;
import com.billcom.eventup.entity.Registration;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    @EntityGraph(attributePaths = {
            "participant.role",
            "event.organisateur.role",
            "event.local",
            "event.sousCategorie.categorie"
    })
    Optional<Registration> findWithFullInfoById(Long id);
}
