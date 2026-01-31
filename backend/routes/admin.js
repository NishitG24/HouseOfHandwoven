import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import Product from '../models/Product.js'
import { authenticateAdmin } from '../middleware/auth.js'

const router = express.Router()

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    
    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create initial admin (run once)
router.post('/setup', async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({})
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' })
    }
    
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'Admin'
    })
    
    await admin.save()
    res.json({ message: 'Admin created successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get dashboard stats (admin only)
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments()
    const featuredProducts = await Product.countDocuments({ featured: true })
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ])
    
    res.json({
      totalProducts,
      featuredProducts,
      categories
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Verify token (admin only)
router.get('/verify', authenticateAdmin, (req, res) => {
  res.json({ 
    valid: true, 
    admin: {
      id: req.admin._id,
      email: req.admin.email,
      name: req.admin.name
    }
  })
})

export default router