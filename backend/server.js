import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRoutes from './routes/products.js'
import adminRoutes from './routes/admin.js'
import eventRoutes from './routes/events.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// CORS Configuration
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api/products', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/events', eventRoutes)

// Fallback admin login without database
app.post('/api/admin/fallback-login', (req, res) => {
  const { email, password } = req.body
  
  const validAdmins = [
    { email: 'guptariya821@gmail.com', password: 'Riy@n1sh', name: 'Riya Gupta' },
    { email: 'nishitgupta241@gmail.com', password: 'Riy@n1sh', name: 'Nishit Gupta' },
    { email: 'admin@handwovenjewellery.com', password: 'admin123', name: 'Admin' }
  ]
  
  const admin = validAdmins.find(a => a.email === email && a.password === password)
  
  if (admin) {
    const token = 'fallback_token_' + Date.now()
    res.json({ token, admin: { email: admin.email, name: admin.name } })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'HandWoven Jewellery API is running!',
    mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
    nodeEnv: process.env.NODE_ENV
  })
})

// Simple test login endpoint
app.all('/api/test-login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  const { email, password } = req.body || {}
  
  if (email === 'guptariya821@gmail.com' && password === 'Riy@n1sh') {
    return res.json({ token: 'test_token_123', admin: { email, name: 'Riya Gupta' } })
  }
  if (email === 'nishitgupta241@gmail.com' && password === 'Riy@n1sh') {
    return res.json({ token: 'test_token_456', admin: { email, name: 'Nishit Gupta' } })
  }
  if (email === 'admin@handwovenjewellery.com' && password === 'admin123') {
    return res.json({ token: 'test_token_789', admin: { email, name: 'Admin' } })
  }
  
  res.status(401).json({ message: 'Invalid credentials' })
})

// Seed endpoint for production
app.get('/api/seed', async (req, res) => {
  try {
    const { default: Product } = await import('./models/Product.js')
    const { default: Admin } = await import('./models/Admin.js')
    const { default: Event } = await import('./models/Event.js')
    
    // Clear existing data
    await Product.deleteMany({})
    await Admin.deleteMany({})
    await Event.deleteMany({})
    
    // Create admin users
    const adminUsers = [
      { email: 'admin@handwovenjewellery.com', password: 'admin123', name: 'Admin' },
      { email: 'guptariya821@gmail.com', password: 'Riy@n1sh', name: 'Riya Gupta' },
      { email: 'nishitgupta241@gmail.com', password: 'Riy@n1sh', name: 'Nishit Gupta' }
    ]
    
    for (const adminData of adminUsers) {
      const admin = new Admin(adminData)
      await admin.save()
    }
    
    res.json({ message: 'Database seeded successfully!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error)
      console.log('Continuing with static data fallback')
    })
} else {
  console.log('No MongoDB URI provided, using static data')
}

// Start server regardless of MongoDB connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})