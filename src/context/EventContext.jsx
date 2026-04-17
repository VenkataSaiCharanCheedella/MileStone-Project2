import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

const INITIAL_EVENTS = [
  {
    id: "1",
    name: "Annual Tech Symposium 2026",
    department: "Computer Science",
    date: "October 24, 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Main Auditorium",
    price: 250.00,
    availableTickets: 100,
    totalTickets: 100
  },
  {
    id: "2",
    name: "Business Ethics Workshop",
    department: "Management",
    date: "November 12, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Seminar Hall B",
    price: 150.00,
    availableTickets: 50,
    totalTickets: 50
  },
  {
    id: "3",
    name: "Robotics Hackathon",
    department: "Electronics",
    date: "December 5, 2026",
    time: "9:00 AM - 9:00 PM",
    venue: "Innovation Lab",
    price: 500.00,
    availableTickets: 20,
    totalTickets: 20
  }
];

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('registrations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(registrations));
  }, [registrations]);

  const bookTicket = (eventId, bookingDetails) => {
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === eventId 
        ? { ...event, availableTickets: event.availableTickets - bookingDetails.tickets }
        : event
    ));
    
    setRegistrations(prev => [...prev, { ...bookingDetails, eventId, date: new Date().toISOString() }]);
  };

  const addEvent = (newEvent) => {
    const event = {
      ...newEvent,
      id: Date.now().toString(),
      price: parseFloat(newEvent.price),
      availableTickets: parseInt(newEvent.totalTickets),
      totalTickets: parseInt(newEvent.totalTickets)
    };
    setEvents(prev => [...prev, event]);
  };

  return (
    <EventContext.Provider value={{ events, registrations, bookTicket, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
