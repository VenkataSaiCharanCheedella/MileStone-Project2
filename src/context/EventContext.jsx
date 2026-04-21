import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Failed to fetch events from backend", err);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/registrations');
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      }
    } catch (err) {
      console.error("Failed to fetch registrations from backend", err);
    }
  };

  const bookTicket = async (eventId, bookingDetails) => {
    try {
      // The backend expects numeric eventId
      const numericEventId = Number(eventId);
      const payload = { ...bookingDetails, eventId: numericEventId };

      const response = await fetch('http://localhost:8080/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const newReg = await response.json();
        setRegistrations(prev => [...prev, newReg]);
        
        // Optimistically update the event tickets locally
        setEvents(prevEvents => prevEvents.map(event => 
          event.id === numericEventId || event.id === String(eventId)
            ? { ...event, availableTickets: event.availableTickets - bookingDetails.tickets }
            : event
        ));
        return true;
      } else {
        console.error("Booking failed on backend");
        return false;
      }
    } catch (error) {
      console.error("Network error during booking", error);
      return false;
    }
  };

  const addEvent = async (newEvent) => {
    try {
      const eventToSave = {
        ...newEvent,
        price: parseFloat(newEvent.price),
        availableTickets: parseInt(newEvent.totalTickets),
        totalTickets: parseInt(newEvent.totalTickets)
      };

      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventToSave)
      });

      if (response.ok) {
        const savedEvent = await response.json();
        setEvents(prev => [...prev, savedEvent]);
        return true;
      } else {
        console.error("Adding event failed on backend");
        return false;
      }
    } catch (error) {
      console.error("Network error adding event", error);
      return false;
    }
  };

  return (
    <EventContext.Provider value={{ events, registrations, bookTicket, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
