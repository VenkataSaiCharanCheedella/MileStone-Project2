import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';

const HomePage = () => {
  const { events } = useContext(EventContext);
  const navigate = useNavigate();

  return (
    <div className="home-page" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Upcoming Events</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Discover and book tickets for the best department events.</p>
      </div>

      <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {events.map(event => (
          <div key={event.id} className="card event-card animate-slide-up" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem', flex: 1 }}>
              <span className="event-department" style={{ fontSize: '0.75rem' }}>{event.department}</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{event.name}</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                {event.date}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {event.venue}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>₹{event.price.toFixed(2)}</span>
                <span style={{ fontSize: '0.875rem', color: event.availableTickets > 0 ? 'var(--success)' : 'var(--danger)' }}>
                  {event.availableTickets > 0 ? `${event.availableTickets} left` : 'Sold Out'}
                </span>
              </div>
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={() => navigate(`/event/${event.id}`)}
              disabled={event.availableTickets === 0}
              style={{ width: '100%' }}
            >
              {event.availableTickets > 0 ? 'Book Now' : 'Sold Out'}
            </button>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <p>No events available right now.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
