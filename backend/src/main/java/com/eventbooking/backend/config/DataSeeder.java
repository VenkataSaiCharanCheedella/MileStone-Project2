package com.eventbooking.backend.config;

import com.eventbooking.backend.entity.Event;
import com.eventbooking.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private EventRepository eventRepository;

    @Override
    public void run(String... args) throws Exception {
        if (eventRepository.count() == 0) {
            Event event1 = new Event("Annual Tech Symposium 2026", "Computer Science", "October 24, 2026", "10:00 AM - 4:00 PM", "Main Auditorium", new BigDecimal("250.00"), 100, 100);
            Event event2 = new Event("Business Ethics Workshop", "Management", "November 12, 2026", "2:00 PM - 5:00 PM", "Seminar Hall B", new BigDecimal("150.00"), 50, 50);
            Event event3 = new Event("Robotics Hackathon", "Electronics", "December 5, 2026", "9:00 AM - 9:00 PM", "Innovation Lab", new BigDecimal("500.00"), 20, 20);
            
            eventRepository.saveAll(List.of(event1, event2, event3));
            System.out.println("Database seeded with initial events.");
        }
    }
}
