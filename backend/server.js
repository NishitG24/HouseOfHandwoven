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
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://house-of-handwoven.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api/products', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/events', eventRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'HandWoven Jewellery API is running!' })
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