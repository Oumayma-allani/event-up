package com.billcom.eventup.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SousCategorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Relation vers la catégorie
    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    // (Optionnel) Si tu veux que chaque sous-catégorie soit liée à plusieurs événements
    @OneToMany(mappedBy = "sousCategorie", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Event> events;
    public SousCategorie(Long id) {
        this.id = id;
    }

}
