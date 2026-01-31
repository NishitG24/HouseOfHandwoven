#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting HandWoven Jewellery Store${NC}"
echo -e "${YELLOW}================================${NC}"

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}Port $1 is already in use${NC}"
        return 1
    else
        return 0
    fi
}

# Check if MongoDB connection string is set
if [ -z "$MONGODB_URI" ] && [ ! -f "backend/.env" ]; then
    echo -e "${RED}❌ MongoDB connection not configured${NC}"
    echo -e "${YELLOW}Please ensure backend/.env file exists with MONGODB_URI${NC}"
    exit 1
fi

# Check ports
echo -e "${YELLOW}📡 Checking ports...${NC}"
if ! check_port 3000; then
    echo -e "${RED}Frontend port 3000 is busy. Please stop the process and try again.${NC}"
    exit 1
fi

if ! check_port 5000; then
    echo -e "${RED}Backend port 5000 is busy. Please stop the process and try again.${NC}"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
    cd backend && npm install && cd ..
fi

# Seed database
echo -e "${YELLOW}🌱 Seeding database...${NC}"
cd backend && npm run seed && cd ..

# Start backend
echo -e "${YELLOW}🔧 Starting backend server...${NC}"
cd backend && npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${YELLOW}🎨 Starting frontend server...${NC}"
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 2

echo -e "${GREEN}✅ Both servers are starting up!${NC}"
echo -e "${GREEN}🌐 Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}🔧 Backend: http://localhost:5000${NC}"
echo -e "${GREEN}👨‍💼 Admin Panel: http://localhost:3000/admin/login${NC}"
echo -e "${YELLOW}📧 Admin Email: admin@handwovenjewellery.com${NC}"
echo -e "${YELLOW}🔑 Admin Password: admin123${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Servers stopped${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait