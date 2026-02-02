# Deploy Backend to Render.com

1. Go to https://render.com and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository: https://github.com/NishitG24/HouseOfHandwoven
4. Configure:
   - Name: handwoven-backend
   - Root Directory: backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   
5. Add Environment Variables:
   - MONGODB_URI: mongodb+srv://nishitautomationtest_db_user:mrPtSCZLR5ksyLeM@handwovenjwel.14wmjuu.mongodb.net/handwoven_jewellery
   - JWT_SECRET: handwoven_jwt_secret_2024_secure_production_key
   - NODE_ENV: production
   - ADMIN_EMAIL: admin@handwovenjewellery.com
   - ADMIN_PASSWORD: admin123

6. Deploy and get the URL (e.g., https://handwoven-backend.onrender.com)

7. Update frontend .env:
   VITE_API_URL=https://handwoven-backend.onrender.com/api

8. Redeploy frontend to Vercel