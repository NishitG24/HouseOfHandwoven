import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import Admin from './models/Admin.js'

dotenv.config()

const createAdminUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing admin users
    await Admin.deleteMany({})
    console.log('Cleared existing admin users')

    const password = 'Riy@n1sh'
    const hashedPassword = await bcrypt.hash(password, 12)

    const adminUsers = [
      {
        name: 'Riya Gupta',
        email: 'guptariya821@gmail.com',
        password: hashedPassword
      },
      {
        name: 'Nishit Gupta', 
        email: 'nishitgupta241@gmail.com',
        password: hashedPassword
      }
    ]

    await Admin.insertMany(adminUsers)
    console.log('Admin users created successfully!')
    console.log('Email: guptariya821@gmail.com')
    console.log('Email: nishitgupta241@gmail.com') 
    console.log('Password: Riy@n1sh')

    process.exit(0)
  } catch (error) {
    console.error('Error creating admin users:', error)
    process.exit(1)
  }
}

createAdminUsers()