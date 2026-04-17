import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const BookingForm = ({ event, availableTickets, onBookTickets }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    tickets: 1
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department.trim()) newErrors.department = 'Department is required';
    
    if (!formData.tickets) {
      newErrors.tickets = 'Number of tickets is required';
    } else if (formData.tickets < 1) {
      newErrors.tickets = 'Must book at least 1 ticket';
    } else if (formData.tickets > availableTickets) {
      newErrors.tickets = `Only ${availableTickets} tickets available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tickets' ? (value === '' ? '' : parseInt(value)) : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // --- EMAILJS CONFIGURATION ---
        // REPLACE THESE WITH YOUR ACTUAL EMAILJS DETAILS
        const SERVICE_ID = 'service_epl60rf'; // Replace with your Service ID
        const TEMPLATE_ID = 'template_l7gw2g9'; // Replace with your Template ID
        const PUBLIC_KEY = 'mbVYfLMSnzd0Gzl7-'; // Your actual Public Key
        
        const templateParams = {
          name: formData.name,
          email: formData.email,
          title: event.name,
          tickets: formData.tickets,
          total_amount: (formData.tickets * event.price).toFixed(2)
        };

        // Attempt to send email. If it fails, we still book the ticket.
        if (TEMPLATE_ID !== 'YOUR_TEMPLATE_ID') {
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
          console.log("Email sent successfully");
        } else {
          console.log("EmailJS not configured yet. Skipping email.");
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));
        }

        onBookTickets(formData);
      } catch (error) {
        console.error("Failed to send email:", error);
        alert("Booking successful, but failed to send confirmation email.");
        onBookTickets(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      department: '',
      tickets: 1
    });
    setErrors({});
  };

  const isFormValid = formData.name && formData.email && formData.department && formData.tickets > 0 && formData.tickets <= availableTickets;

  return (
    <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="form-title">Book Your Tickets</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            className={`form-input ${errors.department ? 'error' : ''}`}
            placeholder="Engineering"
            value={formData.department}
            onChange={handleChange}
          />
          {errors.department && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {errors.department}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="tickets">Number of Tickets</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            className={`form-input ${errors.tickets ? 'error' : ''}`}
            min="1"
            max={availableTickets}
            value={formData.tickets}
            onChange={handleChange}
          />
          {errors.tickets && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {errors.tickets}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!isFormValid || isSubmitting || availableTickets === 0}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                Processing...
              </>
            ) : (
              `Book ${formData.tickets || 0} Ticket${formData.tickets !== 1 ? 's' : ''} - ₹${((formData.tickets || 0) * event.price).toFixed(2)}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
