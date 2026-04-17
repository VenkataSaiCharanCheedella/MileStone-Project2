import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { events, registrations, addEvent } = useContext(EventContext);
  const [activeTab, setActiveTab] = useState('events'); // 'events' or 'registrations'

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const [newEvent, setNewEvent] = useState({
    name: '',
    department: '',
    date: '',
    time: '',
    venue: '',
    price: '',
    totalTickets: ''
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    addEvent(newEvent);
    setNewEvent({
      name: '',
      department: '',
      date: '',
      time: '',
      venue: '',
      price: '',
      totalTickets: ''
    });
    alert('Event created successfully!');
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <button 
          className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('events')}
        >
          Create Event
        </button>
        <button 
          className={`btn ${activeTab === 'registrations' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('registrations')}
        >
          View Registrations
        </button>
      </div>

      {activeTab === 'events' && (
        <div className="card animate-fade-in" style={{ maxWidth: '600px' }}>
          <h2 className="form-title">Create New Event</h2>
          <form onSubmit={handleCreateEvent}>
            <div className="form-group">
              <label className="form-label">Event Name</label>
              <input required type="text" className="form-input" value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input required type="text" className="form-input" value={newEvent.department} onChange={e => setNewEvent({...newEvent, department: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Date (e.g. October 24, 2026)</label>
                <input required type="text" className="form-input" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Time (e.g. 10:00 AM)</label>
                <input required type="text" className="form-input" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <input required type="text" className="form-input" value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Ticket Price (₹)</label>
                <input required type="number" min="0" step="0.01" className="form-input" value={newEvent.price} onChange={e => setNewEvent({...newEvent, price: e.target.value})} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Total Tickets</label>
                <input required type="number" min="1" className="form-input" value={newEvent.totalTickets} onChange={e => setNewEvent({...newEvent, totalTickets: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Event</button>
          </form>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="card animate-fade-in" style={{ overflowX: 'auto' }}>
          <h2 className="form-title">All Registrations</h2>
          {registrations.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No registrations yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Event</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Email</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Dept.</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Tickets</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Date Booked</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, idx) => {
                  const event = events.find(e => e.id === reg.eventId);
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem' }}>{event ? event.name : 'Unknown Event'}</td>
                      <td style={{ padding: '1rem' }}>{reg.name}</td>
                      <td style={{ padding: '1rem' }}>{reg.email}</td>
                      <td style={{ padding: '1rem' }}>{reg.department}</td>
                      <td style={{ padding: '1rem' }}>{reg.tickets}</td>
                      <td style={{ padding: '1rem' }}>{new Date(reg.date).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
