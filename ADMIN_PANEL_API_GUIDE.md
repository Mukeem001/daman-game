# 🔐 Admin Panel - Complete API Guide

## 📋 Authentication

### Headers Required for All Requests:
```
admin-token: YOUR_ADMIN_TOKEN  (For admin endpoints)
auto-token: USER_JWT_TOKEN     (For user endpoints)
Authorization: Bearer TOKEN    (Alternative - for some endpoints)
```

---

## 🚀 Available API Routes

### ✅ ADMIN ROUTES (`/api/admin/*`) - Requires `admin-token` header

#### 1️⃣ USER MANAGEMENT

**GET /api/admin/users**
- Get all registered users
- Response: `{ success: true, count: 5, users: [{id, name, usernumber, userbalance, ...}] }`

**PUT /api/admin/users/:id/balance**
- Update user balance
- Body: `{ userbalance: 1000 }`
- Response: `{ success: true, user: {updated_user_object} }`

---

#### 2️⃣ BET MANAGEMENT

**GET /api/admin/bets**
- Get all bets with statistics
- Response: 
```json
{
  "success": true,
  "stats": {
    "totalBets": 150,
    "pendingBets": 45,
    "completedBets": 105,
    "totalBetAmount": 5000,
    "totalWinAmount": 2500,
    "totalLossAmount": 2500,
    "totalWins": 78,
    "totalLosses": 27,
    "winRate": 52.34
  },
  "bets": [...]
}
```

**GET /api/admin/bets/period/:periodno**
- Get all bets for a specific period
- Example: `/api/admin/bets/period/202604171023`

**POST /api/admin/bets/selected**
- Get bets by period (using body)
- Body: `{ priodno: "202604171023" }`

---

#### 3️⃣ GAME HISTORY MANAGEMENT

**POST /api/admin/history**
- Add game result for a period
- Body: 
```json
{
  "periodno": "202604171023",
  "betnumbers": "7",
  "bigsmall": "Big",
  "color": "greenColor"
}
```

---

#### 4️⃣ BET CONTROL MANAGEMENT

**POST /api/admin/betcontrol**
- Add bet control (odds management)
- Body:
```json
{
  "priodno": "202604171023",
  "big": 1500,      // Total big bets
  "small": 1200,    // Total small bets
  "red": 800,       // Total red bets
  "green": 900,     // Total green bets
  "violet": 600,    // Total violet bets
  "Num0": 100,      // Bets on number 0
  "Num1": 150,      // Bets on number 1
  // ... Num2 to Num9
}
```

**PUT /api/admin/betcontrol**
- Update existing bet control
- Body: Same as POST

---

#### 5️⃣ DIAGNOSTICS

**GET /api/admin/diagnose/bets**
- Check pending bets vs game results
- Helps identify mismatches

---

#### 6️⃣ MIGRATIONS

**POST /api/admin/migrate/fix-priodno**
- Migrate period numbers to correct format

**POST /api/admin/migrate/fix-status**
- Migrate bet status from "Completed" to "win"/"loss"

---

### ✅ USER ROUTES (`/api/user/*`) - Requires `auto-token` header

**GET /api/user/Getuser**
- Get current user profile
- Response: `{ id, name, usernumber, userbalance, invitationCode, ... }`

**POST /api/user/newuser**
- Register new user
- Body: `{ usernumber, password, userbalance, name }`

**POST /api/user/userlogin**
- Login user
- Body: `{ usernumber, password }`
- Response: `{ success: true, autotoken: "JWT_TOKEN", user: {...} }`

**PUT /api/user/userupdate**
- Update user balance
- Body: `{ userbalance: 1500 }`

**GET /api/user/balance**
- Get user balance only
- Response: `{ success: true, balance: 1500, userId: "..." }`

---

### ✅ BET ROUTES (`/api/Bet/*`)

**POST /api/Bet/adduserbethis**
- Place a bet
- Body:
```json
{
  "priodno": 202604171023,
  "pamount": 100,
  "tax": 5,
  "amountaftertax": 95,
  "select": "Green",
  "gameType": "30sec",
  "status": "pending",
  "ordertime": 1713355200
}
```

---

### ✅ WITHDRAWAL ROUTES (`/api/withdraw/*`) - Requires `auto-token` header

**GET /api/withdraw/history**
- Get user's withdrawal history
- Query params: `?method=UPI&status=pending`

**POST /api/withdraw/request**
- Create withdrawal request
- Body:
```json
{
  "amount": 500,
  "method": "UPI",
  "bankName": "SBI",
  "accountNumber": "1234567890",
  "upiId": "user@okhdfcbank"
}
```

**POST /api/withdraw/beneficiary**
- Add withdrawal beneficiary
- Body:
```json
{
  "accountHolderName": "John Doe",
  "bankName": "SBI",
  "accountNumber": "1234567890",
  "ifsc": "SBIN0001234",
  "method": "Bank Transfer"
}
```

**GET /api/withdraw/beneficiary**
- Get user's saved beneficiaries

---

### ✅ DEPOSIT ROUTES (`/api/pay/*`) - Requires JWT token

**POST /api/pay/create-order**
- Create deposit order
- Body:
```json
{
  "amount": 500,
  "paymentMethod": "UPI-QR",
  "paymentChannel": "UPI-QR"
}
```

**POST /api/pay/submit-utr**
- Submit UTR for deposit confirmation
- Body:
```json
{
  "orderId": "ORDER_ID",
  "utrNumber": "123456789"
}
```

---

### ✅ HISTORY ROUTES

**GET /api/history/getwingoitems** (1min game results)
**GET /api/history30sec/getwingoitems** (30sec game results)
**GET /api/history3min/getwingoitems** (3min game results)
**GET /api/history5min/getwingoitems** (5min game results)

---

## 📊 Admin Panel Features You Can Build:

### 1. Dashboard
- Display stats: Total users, total bets, total wins/losses
- Show bet distribution across game types
- Real-time balance changes

### 2. User Management
- List all users with search/filter
- Update user balance (add/deduct funds)
- View user bet history
- Block/unblock users

### 3. Bet Management
- View all bets by period
- Approve/reject pending bets
- Manually set game results
- View win rate statistics

### 4. Game Control
- Set game results (number, color, big/small)
- Manage bet odds/payouts
- Set betting limits

### 5. Withdrawal Management
- View pending withdrawals
- Approve/reject withdrawals
- Manage commission history

### 6. Reports & Analytics
- Daily/monthly revenue
- User growth chart
- Popular betting patterns
- Fraud detection

---

## 🔒 IMPORTANT SECURITY NOTES:

1. **Admin Token**: Implement strong admin authentication in middleware
2. **Logging**: All admin actions are logged
3. **Validation**: Always validate input on backend
4. **Rate Limiting**: Add rate limiting for sensitive endpoints
5. **Audit Trail**: Keep records of all admin changes

---

## 📝 Sample Admin Panel API Call (JavaScript):

```javascript
// Get all users
fetch('http://localhost:5000/api/admin/users', {
  headers: {
    'admin-token': 'YOUR_ADMIN_TOKEN',
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log(data))

// Update user balance
fetch('http://localhost:5000/api/admin/users/USER_ID/balance', {
  method: 'PUT',
  headers: {
    'admin-token': 'YOUR_ADMIN_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ userbalance: 5000 })
})

// Get all bets stats
fetch('http://localhost:5000/api/admin/bets', {
  headers: {
    'admin-token': 'YOUR_ADMIN_TOKEN'
  }
})
```

---

## ⚙️ Next Steps to Build Admin Panel:

1. ✅ Create `/src/Admin/Admin.js` component
2. ✅ Create admin login page
3. ✅ Build dashboard with all stats
4. ✅ Create user management table
5. ✅ Create bet approval interface
6. ✅ Add withdrawal management
7. ✅ Create reports section

Want me to build any specific part of the admin panel? 🚀
