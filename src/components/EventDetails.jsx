import React from 'react';

const EventDetails = ({ event, availableTickets }) => {
  const isLowTickets = availableTickets <= 20;

  return (
    <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="event-header">
        <span className="event-department">{event.department}</span>
        <h1 className="event-title">{event.name}</h1>
      </div>

      <div className="event-info-list">
        <div className="info-item">
          <div className="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div className="info-text">
            <span className="info-label">Date & Time</span>
            <span className="info-value">{event.date} at {event.time}</span>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div className="info-text">
            <span className="info-label">Venue</span>
            <span className="info-value">{event.venue}</span>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="info-text">
            <span className="info-label">Ticket Price</span>
            <span className="info-value">₹{event.price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className={`ticket-status ${isLowTickets ? 'low' : ''}`}>
        <div className="status-text">
          <span className="status-label">Available Tickets</span>
        </div>
        <div className="status-value">{availableTickets}</div>
      </div>
    </div>
  );
};

export default EventDetails;
