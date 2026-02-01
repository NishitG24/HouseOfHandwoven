import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { eventsAPI } from '../services/api'

const EventsSection = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll()
      setEvents(response.data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
      // Fallback to static data
      setEvents([
        {
          _id: '1',
          title: "Handcraft Exhibition 2024",
          date: "March 15-17, 2024",
          time: "10:00 AM - 8:00 PM",
          location: "City Art Gallery, Mumbai",
          description: "Visit us at our biggest handcraft exhibition featuring over 200 unique pieces."
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (type) => {
    return '🎨'
  }

  const getEventColor = (type) => {
    return '#0F4C75'
  }

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #E3F2FD 0%, #BBE1FA 50%, #E3F2FD 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            padding: '8px 20px',
            background: 'rgba(15, 76, 117, 0.15)',
            borderRadius: '25px',
            color: '#0F4C75'
          }}>
            <Calendar size={20} />
            <span style={{ fontWeight: '600' }}>Upcoming Exhibitions</span>
          </div>
          
          <h2 style={{
            fontSize: '42px',
            marginBottom: '20px',
            color: '#0F4C75',
            fontFamily: 'serif'
          }}>
            Visit Us at Our
            <span style={{ color: '#3282B8' }}> Exhibitions</span>
          </h2>
          
          <p style={{
            fontSize: '18px',
            color: '#0F4C75',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Experience our handcraft artistry in person at these upcoming exhibitions. 
            See our complete collection and meet our artisans at these special events.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              Loading events...
            </div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>No upcoming exhibitions at the moment.</p>
            </div>
          ) : (
            events.map((event) => (
            <div
              key={event._id || event.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 8px 25px rgba(15, 76, 117, 0.08)',
                border: `3px solid ${getEventColor(event.type)}30`,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {event.image && (
                <div style={{
                  width: '100%',
                  height: '180px',
                  marginBottom: '16px',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
              
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: getEventColor(event.type),
                color: 'white',
                padding: '6px 12px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                Exhibition
              </div>

              {!event.image && (
                <div style={{
                  fontSize: '48px',
                  marginBottom: '20px'
                }}>
                  {getEventIcon(event.type)}
                </div>
              )}

              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#0F4C75',
                lineHeight: '1.3'
              }}>
                {event.title}
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px',
                  color: '#0F4C75'
                }}>
                  <Calendar size={16} color={getEventColor(event.type)} />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                  color: '#0F4C75'
                }}>
                  <MapPin size={16} color={getEventColor(event.type)} />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{event.location}</span>
                </div>
              </div>

              <p style={{
                fontSize: '14px',
                color: '#0F4C75',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                {event.description}
              </p>
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  )
}

export default EventsSection