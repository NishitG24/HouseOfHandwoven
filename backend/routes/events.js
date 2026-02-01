import express from 'express'
import Event from '../models/Event.js'
import { authenticateAdmin } from '../middleware/auth.js'

const router = express.Router()

// Static fallback data
const staticEvents = [
  {
    _id: '1',
    title: 'Handcraft Exhibition 2024',
    date: '2024-03-15',
    location: 'City Art Gallery, Mumbai',
    description: 'Visit us at our biggest handcraft exhibition featuring over 200 unique pieces.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    active: true
  },
  {
    _id: '2',
    title: 'Traditional Jewelry Showcase',
    date: '2024-04-20',
    location: 'Cultural Center, Delhi',
    description: 'Explore traditional jewelry making techniques and our latest collections.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    active: true
  }
]

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ active: true }).sort({ date: 1 })
    res.json(events)
  } catch (error) {
    // Fallback to static data
    console.log('Using static events data')
    res.json(staticEvents.filter(e => e.active))
  }
})

// Get single event (public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(event)
  } catch (error) {
    // Fallback to static data
    const event = staticEvents.find(e => e._id === req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(event)
  }
})

// Create event (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const event = new Event(req.body)
    const savedEvent = await event.save()
    res.status(201).json(savedEvent)
  } catch (error) {
    res.status(400).json({ message: 'Database unavailable. Event creation disabled.' })
  }
})

// Update event (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(event)
  } catch (error) {
    res.status(400).json({ message: 'Database unavailable. Event update disabled.' })
  }
})

// Delete event (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Database unavailable. Event deletion disabled.' })
  }
})

export default router