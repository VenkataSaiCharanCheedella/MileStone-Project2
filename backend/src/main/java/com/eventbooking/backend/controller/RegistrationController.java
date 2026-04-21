package com.eventbooking.backend.controller;

import com.eventbooking.backend.entity.Event;
import com.eventbooking.backend.entity.Registration;
import com.eventbooking.backend.repository.EventRepository;
import com.eventbooking.backend.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    @PostMapping
    @Transactional
    public Registration bookTicket(@RequestBody Registration registration) {
        // Find the event
        Event event = eventRepository.findById(registration.getEventId())
            .orElseThrow(() -> new RuntimeException("Event not found"));

        // Check availability
        if (event.getAvailableTickets() < registration.getTickets()) {
            throw new RuntimeException("Not enough tickets available");
        }

        // Update available tickets
        event.setAvailableTickets(event.getAvailableTickets() - registration.getTickets());
        eventRepository.save(event);

        // Set date if not provided
        if (registration.getDate() == null || registration.getDate().isEmpty()) {
            registration.setDate(java.time.Instant.now().toString());
        }

        // Save registration
        return registrationRepository.save(registration);
    }
}
