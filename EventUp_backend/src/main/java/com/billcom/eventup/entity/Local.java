package com.billcom.eventup.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private int capacity;

    private String type;

    @OneToMany(mappedBy = "local")
    @JsonIgnore
    private List<Event> events;
    public Local(Long id) {
        this.id = id;
    }


}
