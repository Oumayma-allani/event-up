package com.billcom.eventup.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime registrationDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User participant;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}
