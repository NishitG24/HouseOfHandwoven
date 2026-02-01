# 🚀 Vercel Deployment Instructions

## Frontend Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy Frontend**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set project name: `handwoven-jewellery`
   - Deploy automatically

## Backend Deployment

1. **Create separate backend repo** or deploy from `/backend` folder
2. **Deploy backend first** to get API URL
3. **Update frontend** with production API URL

## Environment Variables

### Frontend (Vercel Dashboard):
```
VITE_WHATSAPP_NUMBER=+918602296793
VITE_INSTAGRAM_HANDLE=alive_incolors
VITE_API_URL=https://your-backend-url.vercel.app/api
VITE_BUSINESS_NAME=House of HandWoven Collection
```

### Backend (Vercel Dashboard):
```
MONGODB_URI=mongodb+srv://nishitautomationtest_db_user:mrPtSCZLR5ksyLeM@handwovenjwel.14wmjuu.mongodb.net/handwoven_jewellery
JWT_SECRET=handwoven_jwt_secret_2024_production
NODE_ENV=production
```

## Admin Access
- **Email**: guptariya821@gmail.com or nishitgupta241@gmail.com
- **Password**: Riy@n1sh

## Features Ready for Testing
✅ Product catalog with stock management
✅ Event management system
✅ Admin panel with full CRUD
✅ WhatsApp & Instagram integration
✅ Mobile responsive design
✅ Ocean blue/teal theme
✅ Image upload functionality

## Test URLs (After Deployment)
- **Website**: https://handwoven-jewellery.vercel.app
- **Admin**: https://handwoven-jewellery.vercel.app/admin/login