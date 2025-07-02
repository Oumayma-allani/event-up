package com.billcom.eventup.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    @Column(nullable = true)
    private String image;
    @ManyToOne
    @JoinColumn(name = "organisateur_id")
    private User organisateur;

    // Relation vers la sous-catégorie
    @ManyToOne
    @JoinColumn(name = "sous_categorie_id")
    private SousCategorie sousCategorie;

    // Relation vers le lieu
    @ManyToOne
    @JoinColumn(name = "local_id")
    private Local local;

    // Liste des inscriptions
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Registration> registrations;
}
