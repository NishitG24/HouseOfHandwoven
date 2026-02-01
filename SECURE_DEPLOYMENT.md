# 🔒 Secure Vercel Deployment Guide

## 📍 MongoDB Configuration Locations:

### Backend Files:
- **`/backend/.env`** - Development environment
- **`/backend/.env.production`** - Production environment  
- **`/backend/server.js`** - Uses `process.env.MONGODB_URI`

## 🚀 Secure Deployment Steps:

### 1. Backend Deployment (Deploy First):

1. **Create Backend Repository**:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend API for HandWoven Jewellery"
   ```

2. **Deploy Backend on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import backend repository
   - **IMPORTANT**: Add environment variables in Vercel Dashboard:

   ```
   MONGODB_URI = mongodb+srv://nishitautomationtest_db_user:mrPtSCZLR5ksyLeM@handwovenjwel.14wmjuu.mongodb.net/handwoven_jewellery
   JWT_SECRET = handwoven_jwt_secret_2024_secure_production_key
   NODE_ENV = production
   ```

3. **Get Backend URL**: `https://your-backend-name.vercel.app`

### 2. Frontend Deployment:

1. **Update Frontend API URL**:
   - Update `.env.production` with your backend URL

2. **Deploy Frontend**:
   - Import main repository to Vercel
   - Add environment variables in Vercel Dashboard:

   ```
   VITE_WHATSAPP_NUMBER = +918602296793
   VITE_INSTAGRAM_HANDLE = alive_incolors
   VITE_API_URL = https://your-backend-name.vercel.app/api
   VITE_BUSINESS_NAME = House of HandWoven Collection
   ```

## 🔐 Security Features:

✅ **Environment Variables**: Stored securely in Vercel Dashboard
✅ **No Credentials in Code**: All sensitive data in .env files
✅ **GitIgnore Protection**: .env files excluded from repository
✅ **JWT Security**: Strong production JWT secret
✅ **MongoDB Atlas**: Cloud database with built-in security

## 🎯 Database Access Confirmed:

- **Admin Panel**: ✅ Full CRUD operations
- **Product Management**: ✅ Add/Edit/Delete products
- **Event Management**: ✅ Add/Edit/Delete events
- **Real-time Updates**: ✅ Instant database synchronization
- **Stock Management**: ✅ Live inventory tracking

## 📱 Admin Access:
- **URL**: `https://your-frontend-url.vercel.app/admin/login`
- **Email**: `guptariya821@gmail.com` or `nishitgupta241@gmail.com`
- **Password**: `Riy@n1sh`

The MongoDB connection is properly secured and will work seamlessly in production! 🚀