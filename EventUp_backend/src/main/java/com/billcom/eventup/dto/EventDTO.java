package com.billcom.eventup.dto;
import com.billcom.eventup.entity.Event;

import java.time.LocalDate;

import jakarta.annotation.Nullable;
import lombok.Getter; // 👈 ajoute ça

@Getter // 👈 ajoute ça
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private String startDate;
    private String endDate;
    private String localName;

    private String sousCategorieName;
    private String categorieName;
    private String organisateurFullName;
    private String image;

    // ✅ Constructeur à partir de l'entité Event
    public EventDTO(Event event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();

        this.startDate = (event.getStartDate() != null) ? event.getStartDate().toString() : null;
        this.endDate = (event.getEndDate() != null) ? event.getEndDate().toString() : null;
        this.localName = event.getLocal().getName();
        this.image = event.getImage();
        if (event.getSousCategorie() != null) {
            this.sousCategorieName = event.getSousCategorie().getName();
            if (event.getSousCategorie().getCategorie() != null) {
                this.categorieName = event.getSousCategorie().getCategorie().getName();
            }
        }

        if (event.getOrganisateur() != null) {
            this.organisateurFullName = event.getOrganisateur().getFirstname() + " " + event.getOrganisateur().getLastname();
        }
    }
}
