package com.billcom.eventup.dto;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class EventFormDTO {
    private String title;
    private String description;
    private String startDate;
    private String endDate;
    private Long localId;
    private Long sousCategorieId;
    private Long organisateurId;

}
