# DhanCash Application - Complete Setup Guide

## 📋 Project Structure Overview

```
DhanCash/
├── backend/                 # Express.js backend server
│   ├── .env                # Backend environment variables
│   ├── index.js            # Main server file
│   ├── _db.js              # MongoDB connection
│   ├── package.json        # Node dependencies
│   ├── Modals/             # MongoDB schemas
│   ├── Router/             # API endpoints
│   ├── midle/              # Middleware
│   └── middleware/
│       └── logger.js       # Request logging
│
└── src/                    # React frontend
    ├── .env                # Frontend environment variables
    ├── App.js              # Main React component
    ├── index.js            # React entry point
    ├── config/
    │   └── config.js       # Centralized configuration
    ├── services/
    │   └── apiClient.js    # Centralized API service
    ├── components/
    │   └── ErrorBoundary.js # Error handling
    ├── Context/
    │   └── MyContext.js    # Global state management
    └── [Other components]  # Game and UI components
```

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ 
- npm v6+
- MongoDB Atlas account (or local MongoDB)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env with your MongoDB URI and JWT secret
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dhancash
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development

# Start backend
npm start          # Production mode
# OR
npm run dev        # Development mode with auto-reload
```

Backend runs on: **http://localhost:5000**

### 2. Frontend Setup

```bash
cd ..  # Go to project root

# Install dependencies
npm install

# Configure environment variables
# Edit .env file
REACT_APP_API_URL=http://localhost:5000
NODE_ENV=development

# Start frontend development server
npm start
```

Frontend runs on: **http://localhost:3000**

## 🔌 API Connection

### Centralized API Service

The app now uses a centralized API client in `src/services/apiClient.js` that:

✅ Manages all backend calls
✅ Handles errors gracefully
✅ Auto-includes authentication tokens
✅ Provides request/response logging
✅ Manages timeouts
✅ Supports development and production modes

### Usage Examples

```javascript
import apiClient from '../services/apiClient';

// Authentication
const loginResponse = await apiClient.auth.login({
  usernumber: '9876543210',
  password: 'password123'
});

// Betting
const betHistory = await apiClient.betting.getBetHistory(userId);

// Game History
const history = await apiClient.history.getHistory1Min(periodNumber);

// Health Check
const health = await apiClient.health();
```

## 🔒 Security Features

### ✅ Implemented

1. **JWT Authentication**
   - Token stored in localStorage
   - Automatically added to API requests
   - Removed on logout

2. **Environment Variables**
   - MongoDB URI hidden in .env
   - API URLs configurable
   - Feature flags supported

3. **Error Boundary**
   - Catches React component crashes
   - Shows user-friendly error messages
   - Development error details available

4. **Request Logging**
   - All API calls logged (development only)
   - Response tracking
   - Error logging with context

### 🔐 Best Practices

1. Never commit `.env` files to git
2. Use strong JWT secrets
3. Implement HTTPS in production
4. Add rate limiting to backend
5. Validate all user inputs

## 📝 Configuration Files

### Backend `.env`
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000
NODE_ENV=development
REACT_APP_ENABLE_DEBUGGING=true
```

## 🛠️ Available Commands

### Backend
```bash
npm start       # Start production server
npm run dev     # Start with auto-reload (nodemon)
npm test        # Run tests (if added)
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
npm run eject   # Eject from create-react-app
```

## 📡 API Endpoints

### Authentication
```
POST /api/user/newuser       # User registration
POST /api/user/userlogin     # User login
```

### Betting & Games
```
GET  /api/betcontrol?priodno=YYYYMMDDHHMM                    # Get bet control for 1min
GET  /api/wingo3minbetcontrol?priodno=YYYYMMDDHHMM           # Get bet control for 3min
GET  /api/history?priodno=YYYYMMDDHHMM                       # Get game history (1min)
GET  /api/history3min?priodno=YYYYMMDDHHMM                   # Get game history (3min)
GET  /api/userbethistory?userid=USER_ID                      # Get user bet history
GET  /api/userbethis3min?userid=USER_ID                      # Get user bet history (3min)
```

### Addresses & Payments
```
GET  /api/Address                      # Get addresses
POST /api/Address                      # Save new address
POST /api/pay                          # Process payment
```

### Health Check
```
GET /health                            # Check if backend is running
```

## 🐛 Debugging

### Development Mode
- API requests logged to console
- Error stack traces visible
- React ErrorBoundary shows details
- Enable `REACT_APP_ENABLE_DEBUGGING=true` in .env

### Production Mode
- Error logging only
- No sensitive data exposed
- User-friendly error messages

## 📊 Monitoring

### Check Backend Status
```bash
# In PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/health"

# Expected Response:
# {"status":"✅ Backend is running!","port":"5000","time":"..."}
```

### Check MongoDB Connection
```bash
# Backend logs will show:
# ✅ MongoDB connected successfully
```

## 🚨 Troubleshooting

### Port 5000 Already in Use
```bash
# Kill process using port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

### MongoDB Connection Failed
1. Check `.env` MongoDB URI
2. Verify internet connection
3. Check MongoDB cluster is active
4. Whitelist your IP in MongoDB Atlas

### API Calls Failing
1. Check backend is running (`npm start`)
2. Verify `.env` API URL in frontend
3. Check network tab in browser DevTools
4. Check backend logs for errors

### CORS Errors
- Backend already has CORS enabled
- Check both frontend and backend running
- Verify API URLs match exactly

## 📚 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT
- **Security**: bcryptjs, CORS

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## 🎯 Next Steps

1. ✅ Configure `.env` files
2. ✅ Start backend: `npm start` (in backend directory)
3. ✅ Start frontend: `npm start` (in root directory)
4. ✅ Test login/signup
5. ✅ Monitor console for errors
6. ✅ Deploy to production

## 📞 Support

For issues or questions:
1. Check this documentation first
2. Review console and backend logs
3. Verify all `.env` files are correctly configured
4. Ensure both backend and frontend are running

---

**Last Updated**: 2026-04-03
**Version**: 1.0.0
**Status**: Production Ready ✅
