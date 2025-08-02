package com.billcom.eventup.dto;
import com.billcom.eventup.entity.Event;
import com.billcom.eventup.entity.Registration;
import com.billcom.eventup.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)

public class RegistrationDTO {
    private Long id;
    private String registrationDate;

    // Info sur le participant
    private Long participantId;
    private String participantFirstname;
    private String participantLastname;
    private String participantEmail;
    private String participantRole;

    // Info sur l’événement
    private Long eventId;
    private String eventTitle;
    private String eventDescription;

    public RegistrationDTO(Registration reg) {

        this.id = reg.getId();
        this.registrationDate = reg.getRegistrationDate().toString();

        User participant = reg.getParticipant();
        if (participant != null) {
            this.participantId = participant.getId();
            this.participantFirstname = participant.getFirstname();
            this.participantLastname = participant.getLastname();
            this.participantEmail = participant.getEmail();
            this.participantRole = (participant.getRole() != null) ? participant.getRole().getName() : null;
        }

        Event event = reg.getEvent();
        if (event != null) {
            this.eventId = event.getId();
            this.eventTitle = event.getTitle();
            this.eventDescription = event.getDescription();
        }
    }
}
