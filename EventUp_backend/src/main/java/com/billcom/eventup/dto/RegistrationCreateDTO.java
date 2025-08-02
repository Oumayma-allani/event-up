package com.billcom.eventup.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RegistrationCreateDTO {
    private Long participantId;
    private Long eventId;
    private String registrationDate;
}
