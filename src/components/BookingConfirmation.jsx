import React from 'react';

const BookingConfirmation = ({ bookingDetails, event, onBookAnother }) => {
  return (
    <div className="card confirmation-card animate-slide-up">
      <div className="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      
      <h2 className="confirmation-title">Booking Successful!</h2>
      <p className="confirmation-subtitle">
        Thank you, {bookingDetails.name}. Your tickets have been reserved.
      </p>

      <div className="receipt">
        <div className="receipt-item">
          <span className="receipt-label">Event</span>
          <span className="receipt-value">{event.name}</span>
        </div>
        <div className="receipt-item">
          <span className="receipt-label">Tickets Booked</span>
          <span className="receipt-value">{bookingDetails.tickets}</span>
        </div>
        <div className="receipt-item">
          <span className="receipt-label">Email ID</span>
          <span className="receipt-value">{bookingDetails.email}</span>
        </div>
        <div className="receipt-item">
          <span className="receipt-label">Total Amount</span>
          <span className="receipt-value">₹{(bookingDetails.tickets * event.price).toFixed(2)}</span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={onBookAnother} style={{ width: '100%', maxWidth: '300px' }}>
        Book More Tickets
      </button>
    </div>
  );
};

export default BookingConfirmation;
