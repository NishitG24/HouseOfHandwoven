import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { eventsAPI } from '../../services/api';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await eventsAPI.update(editingEvent._id, formData);
      } else {
        await eventsAPI.create(formData);
      }
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventsAPI.delete(id);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      location: event.location
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', date: '', location: '' });
    setEditingEvent(null);
    setShowForm(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#0F4C75', fontSize: '28px', fontWeight: 'bold' }}>Manage Events</h1>
        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: '#3282B8',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          <Plus size={20} /> Add Event
        </button>
      </div>

      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: '#0F4C75', margin: 0 }}>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
              <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} color="#666" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#0F4C75', fontWeight: '500' }}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #BBE1FA',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#0F4C75', fontWeight: '500' }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #BBE1FA',
                    borderRadius: '6px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#0F4C75', fontWeight: '500' }}>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #BBE1FA',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#0F4C75', fontWeight: '500' }}>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #BBE1FA',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '10px 20px',
                    border: '2px solid #BBE1FA',
                    backgroundColor: 'white',
                    color: '#0F4C75',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3282B8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Save size={16} /> {editingEvent ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {events.map((event) => (
          <div key={event._id} style={{
            border: '2px solid #BBE1FA',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(15, 76, 117, 0.1)'
          }}>
            <img
              src={event.image || 'https://via.placeholder.com/300x200?text=Event'}
              alt={event.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '15px'
              }}
            />
            <h3 style={{ color: '#0F4C75', marginBottom: '10px', fontSize: '18px' }}>{event.title}</h3>
            <p style={{ color: '#666', marginBottom: '10px', fontSize: '14px' }}>{event.description}</p>
            <p style={{ color: '#3282B8', marginBottom: '10px', fontWeight: '500' }}>
              📅 {new Date(event.date).toLocaleDateString()}
            </p>
            <p style={{ color: '#3282B8', marginBottom: '15px', fontWeight: '500' }}>📍 {event.location}</p>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => handleEdit(event)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#3282B8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;