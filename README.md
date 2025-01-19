# 🚗 Car Repair Booking System

A comprehensive end-to-end solution for managing vehicle repair services, connecting customers with mechanics seamlessly.

## 🌟 Features

### For Customers
- 👤 User authentication and profile management
- 🚙 Easy car registration and service booking
- 💰 Transparent pricing and service packages
- 📱 Real-time repair status tracking
- 📅 Service history and maintenance records

### For Mechanics
- 📋 Job request management
- 🔧 Service tracking and updates
- 💼 Profile and expertise management

### For Administrators
- 👥 User management (customers & mechanics)
- 🛠️ Service package configuration
- 📈 Analytics and reporting
- 🎯 Job assignment optimization

## 🚀 Tech Stack

- **Frontend:** React.js with Material-UI
- **Backend:** Node.js
- **Database:** MongoDB
- **Authentication:** JWT
- **API:** RESTful architecture

## 🛠️ Installation & Setup Guide

### Frontend Setup

1. Clone the repository
```bash
git clone https://github.com/Harshil-sitapara/eMechanic.git
cd eMechanic
```

2. Install frontend dependencies
```bash
cd Client/car-wash-system
npm install
```

3. Start the frontend application
```bash
npm run dev
```

The frontend will run on http://localhost:3000

### Backend Setup

1. Set up environment variables:
   Create .env file in each service directory (Admin, Customer, Mechanic, Order) with:
```
MONGO_URL=
PORT=
```

2. Install and start each service:

For Admin Service (Port 8088):
```bash
cd Server/Admin
npm install
npm start
```

For Customer Service (Port 8040):
```bash
cd Server/Customer
npm install
npm start
```

For Mechanic Service (Port 8020):
```bash
cd Server/Mechanic
npm install
npm start
```

For Order Service (Port 8030):
```bash
cd Server/Order
npm install
npm start
```

## 📝 Additional Notes

- Each service runs on its own port
- Make sure MongoDB is running
- All services must be running for full functionality
- Check individual service logs for any errors