import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import EventDetails from '../components/EventDetails';
import BookingForm from '../components/BookingForm';
import BookingConfirmation from '../components/BookingConfirmation';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, bookTicket } = useContext(EventContext);
  
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const event = events.find(e => e.id === id);

  useEffect(() => {
    if (!event) {
      navigate('/');
    }
  }, [event, navigate]);

  if (!event) return null;

  const handleBookTickets = (details) => {
    bookTicket(event.id, details);
    setBookingDetails(details);
    setIsBooked(true);
    
    // EmailJS integration will go here
  };

  const handleBookAnother = () => {
    setIsBooked(false);
    setBookingDetails(null);
  };

  return (
    <div className="app-container">
      <EventDetails 
        event={event} 
        availableTickets={event.availableTickets} 
      />
      
      {isBooked ? (
        <BookingConfirmation 
          bookingDetails={bookingDetails}
          event={event}
          onBookAnother={handleBookAnother}
        />
      ) : (
        <BookingForm 
          event={event} 
          availableTickets={event.availableTickets} 
          onBookTickets={handleBookTickets} 
        />
      )}
    </div>
  );
};

export default BookingPage;
