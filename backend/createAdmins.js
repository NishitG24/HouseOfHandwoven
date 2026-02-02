import mongoose from 'mongoose'
import Admin from './models/Admin.js'
import dotenv from 'dotenv'

dotenv.config()

const createAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    
    await Admin.deleteMany({})
    
    const adminUsers = [
      { email: 'admin@handwovenjewellery.com', password: 'admin123', name: 'Admin' },
      { email: 'guptariya821@gmail.com', password: 'Riy@n1sh', name: 'Riya Gupta' },
      { email: 'nishitgupta241@gmail.com', password: 'Riy@n1sh', name: 'Nishit Gupta' }
    ]
    
    for (const adminData of adminUsers) {
      const admin = new Admin(adminData)
      await admin.save()
      console.log(`Created admin: ${adminData.email}`)
    }
    
    console.log('All admins created successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

createAdmins()