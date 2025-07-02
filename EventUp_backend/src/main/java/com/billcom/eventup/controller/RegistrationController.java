package com.billcom.eventup.controller;
import com.billcom.eventup.entity.Registration;
import com.billcom.eventup.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
//@CrossOrigin("*")
public class RegistrationController {
    @Autowired
    private RegistrationRepository registrationRepository;

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    @PostMapping
    public Registration createRegistration(@RequestBody Registration registration) {
        return registrationRepository.save(registration);
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
