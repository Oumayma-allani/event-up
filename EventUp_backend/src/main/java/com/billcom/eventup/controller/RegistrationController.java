package com.billcom.eventup.controller;
import com.billcom.eventup.dto.RegistrationCreateDTO;
import com.billcom.eventup.dto.RegistrationDTO;
import com.billcom.eventup.entity.Registration;
import com.billcom.eventup.repository.EventRepository;
import com.billcom.eventup.repository.RegistrationRepository;
import com.billcom.eventup.repository.UserRepository;
import com.billcom.eventup.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.billcom.eventup.entity.User;
import com.billcom.eventup.entity.Event;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/api/registrations")
//@CrossOrigin("*")
public class RegistrationController {
    @Autowired
    private RegistrationRepository registrationRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<RegistrationDTO> createRegistration(@RequestBody RegistrationCreateDTO request) {
        // Récupération des données
        Long userId = request.getParticipantId();
        Long eventId = request.getEventId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Événement introuvable"));

        Registration registration = new Registration();
        registration.setParticipant(user);
        registration.setEvent(event);
        registration.setRegistrationDate(LocalDateTime.now());

        Registration saved = registrationRepository.saveAndFlush(registration);
        Registration full = registrationRepository.findWithFullInfoById(saved.getId())
                .orElseThrow(() -> new RuntimeException("Erreur de rechargement de l'inscription"));

        RegistrationDTO dto = new RegistrationDTO(full);
        return ResponseEntity.ok(dto);
    }






    @GetMapping("/{id}")
    public Registration getRegistrationById(@PathVariable Long id) {
        return registrationRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Registration updateRegistration(@PathVariable Long id, @RequestBody Registration updatedRegistration) {
        Registration reg = registrationRepository.findById(id).orElse(null);
        if (reg != null) {
            reg.setEvent(updatedRegistration.getEvent());
            reg.setParticipant(updatedRegistration.getParticipant());
            return registrationRepository.save(reg);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteRegistration(@PathVariable Long id) {
        registrationRepository.deleteById(id);
    }
}
