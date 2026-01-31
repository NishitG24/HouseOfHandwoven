import express from 'express'
import Event from '../models/Event.js'
import { authenticateAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ active: true }).sort({ createdAt: -1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ message: error.message })
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
    res.status(500).json({ message: error.message })
  }
})

// Create event (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const event = new Event(req.body)
    const savedEvent = await event.save()
    res.status(201).json(savedEvent)
  } catch (error) {
    res.status(400).json({ message: error.message })
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
    res.status(400).json({ message: error.message })
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
    res.status(500).json({ message: error.message })
  }
})

export default router