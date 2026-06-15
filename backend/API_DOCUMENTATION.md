# DhanCash Backend API Documentation

## Server Info
- **Base URL**: `http://localhost:5000`
- **Environment**: Development
- **Database**: MongoDB Atlas

## Health Check
```
GET /health
Response: { status: "✅ Backend is running!", port: 5000, time: "..." }
```

## Authentication APIs

### 1. User Registration
```
POST /api/user/newuser
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "usernumber": "9876543210",
  "password": "secure_password_123",
  "userbalance": 0
}

Response (Success - 200):
{
  "success": true,
  "autotoken": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "usernumber": "9876543210"
  }
}

Response (Error - 400):
{
  "success": false,
  "error": "This phone number is already registered..."
}
```

### 2. User Login
```
POST /api/user/userlogin
Content-Type: application/json

Request Body:
{
  "usernumber": "9876543210",
  "password": "secure_password_123"
}

Response (Success - 200):
{
  "success": true,
  "autotoken": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "usernumber": "9876543210"
  }
}

Response (Error - 400):
{
  "success": false,
  "error": "Invalid credentials..."
}
```

## Game History APIs

### 1. Wingo 1 Min History
```
GET /api/history?priodno=202604031000
GET POST endpoints available
```

### 2. Wingo 3 Min History
```
GET /api/history3min?priodno=202604031000
GET POST endpoints available
```

## Bet Control APIs

### 1. Wingo 1 Min Bet Control
```
GET /api/betcontrol?priodno=202604031000
POST /api/betcontrol (update bet)
```

### 2. Wingo 3 Min Bet Control
```
GET /api/wingo3minbetcontrol?priodno=202604031000
POST /api/wingo3minbetcontrol (update bet)
```

## User Bet History APIs

### 1. Get User Bet History (1 Min)
```
GET /api/userbethistory?userid=user_id
Authorization: Bearer {token}
```

### 2. Get User Bet History (3 Min)
```
GET /api/userbethis3min?userid=user_id
Authorization: Bearer {token}
```

## Other APIs

- **Address**: `/api/Address` - User address management
- **Payment**: `/api/pay` - Payment processing
- **Bet Items**: `/api/Bet` - Betting items

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request / Validation Error |
| 404 | Not Found |
| 500 | Server Error |

## Notes

- All timestamps are in format: YYYYMMDDHHMMSS
- JWT tokens expire after 24 hours
- Use the token in Authorization header: `Authorization: Bearer {token}`
