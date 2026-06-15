# 🔐 Admin Panel APIs Guide

## 📌 Base Configuration

```javascript
const API_BASE_URL = 'http://localhost:5000';
const adminToken = localStorage.getItem('admin_token'); // From login

const adminHeaders = {
  'admin-token': adminToken,
  'Content-Type': 'application/json'
};
```

---

## 🔑 Authentication APIs

### **1. Admin Login**
```
POST /api/auth/login
```

**Request:**
```json
{
  "email": "admin@mukeem.com",
  "password": "mukeem@00"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "admin_mukeem",
    "email": "admin@mukeem.com",
    "role": "admin"
  }
}
```

### **2. Get Current Admin Info**
```
GET /api/auth/me
Headers: { 'admin-token': token }
```

**Response (200):**
```json
{
  "success": true,
  "admin": {
    "id": "admin_mukeem",
    "email": "admin@mukeem.com",
    "role": "admin"
  }
}
```

---

## 👥 User Management APIs

### **1. Get All Users**
```
GET /api/admin/users
Headers: { 'admin-token': adminToken }
```

**Response (200):**
```json
{
  "success": true,
  "count": 15,
  "users": [
    {
      "_id": "665f3c1234567890abcdef01",
      "name": "John Doe",
      "usernumber": "9876543210",
      "userbalance": 5000,
      "invitationCode": "ABCD1234",
      "referredBy": null,
      "createdAt": "2026-04-15T10:30:00Z"
    },
    ...
  ]
}
```

### **2. Update User Balance**
```
PUT /api/admin/users/:userId/balance
Headers: { 'admin-token': adminToken }

Body:
{
  "userbalance": 10000
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "665f3c1234567890abcdef01",
    "name": "John Doe",
    "userbalance": 10000,
    "usernumber": "9876543210"
  }
}
```

---

## 💰 Deposit History APIs

### **1. Get All Deposits (Admin View)**
```
GET /api/pay/user-orders
Headers: { 'Authorization': 'Bearer adminToken' }
```

**Response (200):**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "665f3c1234567890abcdef02",
      "userId": "665f3c1234567890abcdef01",
      "orderNumber": "ORD-1744689000000-ABC123DEF",
      "amount": 1000,
      "paymentMethod": "bank_transfer",
      "paymentChannel": "SBIBank",
      "barcode": "ORD-1744689000000-ABC123DEF-QR",
      "status": "pending",
      "utrNumber": "12345678901234",
      "utrSubmittedAt": "2026-04-17T10:30:00Z",
      "bonus": 10,
      "finalAmount": 1010,
      "createdAt": "2026-04-17T10:00:00Z"
    },
    ...
  ]
}
```

### **2. Approve/Reject Deposit Order**
```
POST /api/pay/admin-approve
Headers: { 'admin-token': adminToken }

Body:
{
  "orderId": "665f3c1234567890abcdef02",
  "approved": true,
  "notes": "Payment verified"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order approved and wallet updated",
  "order": {
    "_id": "665f3c1234567890abcdef02",
    "orderNumber": "ORD-1744689000000-ABC123DEF",
    "status": "approved",
    "finalAmount": 1010
  },
  "userBalance": 6010
}
```

---

## 💳 Withdrawal History & Management APIs

### **1. Get All Withdrawals**
```
GET /api/withdraw/history
Headers: { 'auto-token': userToken }
```

**Note:** For admin view of all withdrawals, use:
```
POST /api/admin/withdrawals (if exists) or manually query via admin panel
```

**Response (200):**
```json
{
  "success": true,
  "withdrawals": [
    {
      "_id": "665f3c1234567890abcdef03",
      "userId": "665f3c1234567890abcdef01",
      "amount": 500,
      "method": "upi",
      "status": "pending",
      "createdAt": "2026-04-17T12:00:00Z",
      "transactionId": "TXN12345678",
      "notes": "UPI: user@upi"
    },
    ...
  ]
}
```

### **2. Get All Pending Withdrawals (Admin)**
```javascript
// Query via Mongoose in backend or create endpoint:
GET /api/admin/withdrawals/pending
Headers: { 'admin-token': adminToken }
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "withdrawals": [
    {
      "_id": "665f3c1234567890abcdef03",
      "userId": "665f3c1234567890abcdef01",
      "userName": "John Doe",
      "userPhone": "9876543210",
      "amount": 500,
      "method": "upi",
      "beneficiary": {
        "fullName": "John",
        "upiId": "john@upi"
      },
      "status": "pending",
      "createdAt": "2026-04-17T12:00:00Z"
    }
  ]
}
```

### **3. Approve Withdrawal**
```javascript
// Create in admin.js:
POST /api/admin/withdrawals/approve
Headers: { 'admin-token': adminToken }

Body:
{
  "withdrawalId": "665f3c1234567890abcdef03",
  "transactionId": "TXN_BANK_123456",
  "notes": "Approved and transferred"
}
```

### **4. Reject Withdrawal**
```javascript
POST /api/admin/withdrawals/reject
Headers: { 'admin-token': adminToken }

Body:
{
  "withdrawalId": "665f3c1234567890abcdef03",
  "reason": "Invalid bank details"
}
```

---

## 🎰 User Bet History APIs

### **1. Get All User Bets**
```
GET /api/bet/history
Headers: { 'auto-token': userToken }
```

**Response (200):**
```json
{
  "success": true,
  "count": 25,
  "bets": [
    {
      "_id": "665f3c1234567890abcdef04",
      "gameName": "Win Go 1min",
      "gameType": "1min",
      "status": "Win",
      "createdAt": "2026-04-17T10:30:00Z",
      "period": "202604171030",
      "periodNo": "202604171030",
      "orderId": "BET123456",
      "selection": "red",
      "betType": "red",
      "betAmount": 100,
      "actualAmount": 95,
      "winnings": 200,
      "handlingFee": 5,
      "profitLoss": 100,
      "result": "5 red Big"
    },
    ...
  ]
}
```

### **2. Get Admin View of All Bets**
```
GET /api/admin/bets
Headers: { 'admin-token': adminToken }
```

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalBets": 1250,
    "pendingBets": 45,
    "completedBets": 1205,
    "totalBetAmount": 125000,
    "totalWinAmount": 70000,
    "totalLossAmount": 55000,
    "totalWins": 650,
    "totalLosses": 555,
    "winRate": "52.00"
  },
  "bets": [
    {
      "_id": "665f3c1234567890abcdef04",
      "userId": "665f3c1234567890abcdef01",
      "priodno": "202604171030",
      "gameType": "1min",
      "select": "red",
      "pamount": 100,
      "amountaftertax": 95,
      "tax": 5,
      "winloss": 100,
      "status": "win",
      "resultnumber": "5",
      "resultcolor": "red",
      "resultbigsmall": "Big",
      "ordertime": "2026-04-17T10:30:00Z"
    }
  ]
}
```

### **3. Get Bets for Specific Period**
```
GET /api/admin/bets/period/:periodno
Headers: { 'admin-token': adminToken }

Example:
GET /api/admin/bets/period/202604171030
```

**Response (200):**
```json
{
  "success": true,
  "count": 42,
  "bets": [...]
}
```

### **4. Get Bets (POST Method)**
```
POST /api/admin/bets/selected
Headers: { 'admin-token': adminToken }

Body:
{
  "priodno": "202604171030"
}
```

**Response (200):**
```json
{
  "success": true,
  "count": 42,
  "bets": [...]
}
```

---

## 📊 Dashboard Summary

### **For Admin Dashboard, Combine:**

```javascript
// 1. User Stats
GET /api/admin/users → count users

// 2. Deposit Stats
GET /api/pay/user-orders → sum amounts, count by status

// 3. Withdrawal Stats
GET /api/admin/withdrawals/pending → sum pending amounts

// 4. Bet Stats
GET /api/admin/bets → use returned stats object

// 5. Total Balance
All users balance sum
```

---

## 🔒 Authentication Header

Always use:
```javascript
const headers = {
  'admin-token': localStorage.getItem('admin_token'),
  'Content-Type': 'application/json'
};
```

---

## ❌ Common Errors

| Status | Error | Solution |
|--------|-------|----------|
| 401 | No token provided | Login first, store token |
| 401 | Invalid/expired token | Re-login |
| 404 | Not found | Check ID format |
| 400 | Missing fields | Verify request body |
| 500 | Server error | Check backend logs |

---

## 🚀 Quick Integration Example

```javascript
// React Component Example
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bets, setBets] = useState([]);
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    // Get Users
    fetch('http://localhost:5000/api/admin/users', {
      headers: { 'admin-token': token }
    })
    .then(r => r.json())
    .then(d => setUsers(d.users));

    // Get Bets
    fetch('http://localhost:5000/api/admin/bets', {
      headers: { 'admin-token': token }
    })
    .then(r => r.json())
    .then(d => setBets(d.bets));
  }, [token]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {users.length}</p>
      <p>Total Bets: {bets.length}</p>
    </div>
  );
}
```

---

## 📝 Notes

- All times in **ISO 8601 format** (UTC)
- User ID format: MongoDB ObjectId (24 hex characters)
- Admin token expires in **7 days**
- Withdrawal amounts: ₹100-₹30,000
- Deposit amounts: ₹100-₹50,000
