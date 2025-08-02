package com.billcom.eventup.controller;
import com.billcom.eventup.dto.EventDTO;
import com.billcom.eventup.entity.Event;
import com.billcom.eventup.repository.EventRepository;
import com.billcom.eventup.repository.LocalRepository;
import com.billcom.eventup.repository.SousCategorieRepository;
import com.billcom.eventup.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.billcom.eventup.dto.EventFormDTO;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDate;


import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import com.billcom.eventup.entity.Local;
import com.billcom.eventup.entity.SousCategorie;
import com.billcom.eventup.entity.User;

@RestController
@RequestMapping("/api/events")
//@CrossOrigin(origins = "*")
public class EventController {
    @Autowired
    private EventRepository eventRepository;
    @Autowired private LocalRepository localRepository;
    @Autowired private SousCategorieRepository sousCategorieRepository;
    @Autowired private UserRepository userRepository;
    @PostMapping
    public EventDTO addEvent(@RequestBody Event event) {
        Event savedEvent = eventRepository.save(event);
        return new EventDTO(savedEvent);
    }
    @GetMapping
    public List<EventDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();

        // Filtrer ou traiter les événements corrompus
        List<EventDTO> dtos = events.stream()
                .filter(e -> e != null && e.getStartDate() != null && e.getEndDate() != null)
                .map(EventDTO::new)
                .collect(Collectors.toList());

        System.out.println("✔✔✔ EventDTO envoyé !");
        return dtos;
    }


    @GetMapping("/{id}")
    public EventDTO getEventById(@PathVariable Long id) {
        Event event = eventRepository.findById(id).orElse(null);
        return (event != null) ? new EventDTO(event) : null;
    }
    @PutMapping("/{id}")
    public EventDTO updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Event event = eventRepository.findById(id).orElse(null);
        if (event != null) {
            event.setTitle(updatedEvent.getTitle());
            event.setDescription(updatedEvent.getDescription());
            event.setStartDate(updatedEvent.getStartDate());
            event.setEndDate(updatedEvent.getEndDate());
            event.setSousCategorie(updatedEvent.getSousCategorie());
            event.setLocal(updatedEvent.getLocal());
            event.setOrganisateur(updatedEvent.getOrganisateur());
            event.setRegistrations(updatedEvent.getRegistrations());

            Event saved = eventRepository.save(event);
            return new EventDTO(saved);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createEventWithImage(
            @RequestPart("event") String eventJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            EventFormDTO eventDto = mapper.readValue(eventJson, EventFormDTO.class);

            // Vérification des ID obligatoires
            if (eventDto.getLocalId() == null || eventDto.getSousCategorieId() == null || eventDto.getOrganisateurId() == null) {
                return ResponseEntity.badRequest().body("Local, sous-catégorie ou organisateur manquant");
            }

            // Récupération des entités
            Local local = localRepository.findById(eventDto.getLocalId()).orElse(null);
            SousCategorie sousCategorie = sousCategorieRepository.findById(eventDto.getSousCategorieId()).orElse(null);
            System.out.println("👤 Organisateur ID reçu : " + eventDto.getOrganisateurId());

            User organisateur = userRepository.findById(eventDto.getOrganisateurId()).orElse(null);

            if (local == null || sousCategorie == null || organisateur == null) {
                return ResponseEntity.badRequest().body("Entité introuvable pour local, sous-catégorie ou organisateur");
            }

            String imageName = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                String uploadsDir = "uploads/";
                File uploadFolder = new File(uploadsDir);
                if (!uploadFolder.exists()) uploadFolder.mkdirs();

                imageName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path filePath = Paths.get(uploadsDir + imageName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            }

            // Création de l'objet Event
            Event event = new Event();
            event.setTitle(eventDto.getTitle());
            event.setDescription(eventDto.getDescription());
            event.setStartDate(LocalDate.parse(eventDto.getStartDate()));
            event.setEndDate(LocalDate.parse(eventDto.getEndDate()));
            event.setLocal(local);
            event.setSousCategorie(sousCategorie);
            event.setOrganisateur(organisateur);
            event.setImage(imageName);

            Event saved = eventRepository.save(event);
            return ResponseEntity.ok(new EventDTO(saved));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la création de l'événement : " + e.getMessage());
        }
    }


}
