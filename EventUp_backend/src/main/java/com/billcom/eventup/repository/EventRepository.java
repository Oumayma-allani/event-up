package com.billcom.eventup.repository;

import com.billcom.eventup.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
