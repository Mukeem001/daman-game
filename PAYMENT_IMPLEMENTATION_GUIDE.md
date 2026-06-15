# Payment System - Complete Implementation Guide

## Overview
Complete payment system with 17 payment channels, order creation, UTR submission, and admin approval workflow.

---

## Frontend Implementation

### 1. **Deposit.js** - Main Deposit Component
**File:** `src/Account/Deposit/Deposit.js`

**Features:**
- ✅ 6 Top-level Payment Methods (Payment tab)
- ✅ 9 Preset Amount Options (₹200, ₹400, ₹500, ₹1K, ₹1.2K, ₹1.5K, ₹2K, ₹3K, ₹5K)
- ✅ Custom Amount Input Field
- ✅ **17 Payment Channels** (All Clickable):
  1. UPI-QR
  2. OSPay - UPI x QR
  3. WinPay-UPI
  4. TimePay-UPI X QR
  5. FullPay - UPI X QR
  6. BonusPay UPI × QR (+1% bonus)
  7. YayaPay - UPI x QR
  8. FstPay-UPI
  9. 77Pay - UPI x QR (+1% bonus)
  10. CpuPay UPI x QR
  11. AGPAY - UPI x QR
  12. SpeedPay - UPI x QR
  13. Umoney - UPI x QR
  14. WorldPay - UPI x QR
  15. NewNinePay-UPI
  16. FlashPay - UPI x QR
  17. OrigoPay - UPI x QR

**State Management:**
```javascript
const [amount, setAmount] = useState('');           // Preset/custom amount
const [customAmount, setCustomAmount] = useState(''); // Custom input value
const [selectedMethod, setSelectedMethod] = useState('UPI-QR'); // Payment method (top 6)
const [selectedChannel, setSelectedChannel] = useState('UPI-QR'); // Channel (17 options)
const [loading, setLoading] = useState(false);      // Loading state
```

**Key Functions:**

#### `handleChannelSelect(channelName)`
- Triggered when user clicks any of the 17 payment channel items
- Validates amount (min ₹100)
- Calls `/api/pay/create-order` API
- Navigates to `/deposit/verify-utr` with order data

**Flow:**
1. User selects payment channel → Click handler
2. Validates amount selection
3. Sends POST to backend with:
   - `amount`: Selected/custom amount
   - `paymentMethod`: Top-level method (e.g., "UPI-QR")
   - `paymentChannel`: Specific channel (e.g., "OSPay - UPI x QR")
4. Backend creates order and returns order ID + barcode
5. Frontend navigates to UTR verification page

---

### 2. **VerifyUTR.js** - UTR Submission Component
**File:** `src/Account/Deposit/VerifyUTR.js`

**Features:**
- Displays barcode for payment
- Instruction panel
- UTR number input field (12+ characters)
- Submit button

**Function: `handleUTRSubmit()`**
- Validates UTR (minimum 12 characters)
- Calls `/api/pay/submit-utr` API
- Sends `orderId` and `utrNumber`
- Backend updates order status to `utr_submitted`
- Redirects to wallet page

---

## Backend Implementation

### 3. **Order Model** - Database Schema
**File:** `backend/Modals/Order.js`

```javascript
{
  userId: ObjectId,           // Reference to user
  orderNumber: String,        // Unique order identifier (ORD-timestamp-random)
  amount: Number,             // Deposit amount (100-50000)
  paymentMethod: String,      // Top-level method (UPI-QR, E-Wallet, etc.)
  paymentChannel: String,     // Specific channel (OSPay, WinPay, etc.)
  barcode: String,            // QR code/barcode data
  utrNumber: String,          // UTR submitted by user
  status: String,             // pending | utr_submitted | approved | rejected | failed
  bonus: Number,              // Calculated bonus amount
  finalAmount: Number,        // Amount after bonus
  adminNotes: String,         // Admin rejection reason
  createdAt: Date,
  updatedAt: Date,
  utrSubmittedAt: Date,
  approvedAt: Date
}
```

---

### 4. **Payment Router** - API Endpoints
**File:** `backend/Router/payment.js`

#### Endpoints:

##### **POST `/api/pay/create-order`**
**Authentication:** Bearer token required

**Request Body:**
```json
{
  "amount": 500,
  "paymentMethod": "UPI-QR",
  "paymentChannel": "OSPay - UPI x QR"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "65f3d8c9e4b0a1c2d3e4f5g6",
    "orderNumber": "ORD-1710604489123-ABC123DEF",
    "amount": 500,
    "paymentMethod": "UPI-QR",
    "paymentChannel": "OSPay - UPI x QR",
    "barcode": "ORD-1710604489123-ABC123DEF-QR",
    "status": "pending",
    "createdAt": "2024-03-16T10:34:49.123Z"
  }
}
```

---

##### **POST `/api/pay/submit-utr`**
**Authentication:** Bearer token required

**Request Body:**
```json
{
  "orderId": "65f3d8c9e4b0a1c2d3e4f5g6",
  "utrNumber": "123456789012"
}
```

**Response:**
```json
{
  "success": true,
  "message": "UTR submitted successfully",
  "order": {
    "_id": "65f3d8c9e4b0a1c2d3e4f5g6",
    "orderNumber": "ORD-1710604489123-ABC123DEF",
    "status": "utr_submitted",
    "utrNumber": "123456789012"
  }
}
```

**Status Flow:** `pending` → `utr_submitted` → (waiting for admin)

---

##### **POST `/api/pay/admin-approve`**
**Authentication:** Admin token header required

**Request Body:**
```json
{
  "orderId": "65f3d8c9e4b0a1c2d3e4f5g6",
  "approved": true,
  "notes": "Optional rejection reason if not approved"
}
```

**Response (Approved):**
```json
{
  "success": true,
  "message": "Order approved and wallet updated",
  "order": {
    "_id": "65f3d8c9e4b0a1c2d3e4f5g6",
    "orderNumber": "ORD-1710604489123-ABC123DEF",
    "status": "approved",
    "finalAmount": 505
  },
  "userBalance": 1205  // Updated wallet balance
}
```

**Bonus Logic:**
- BonusPay & 77Pay channels: +1% bonus
- Amounts are calculated and added to user wallet

**Status Flow:** `utr_submitted` → `approved` → User wallet updated

---

##### **GET `/api/pay/orders/:orderId`**
**Authentication:** Bearer token required

**Response:**
```json
{
  "success": true,
  "order": { ...full order object... }
}
```

---

##### **GET `/api/pay/user-orders`**
**Authentication:** Bearer token required

**Response:**
```json
{
  "success": true,
  "orders": [
    { ...order object... },
    { ...order object... }
  ]
}
```

---

## Complete User Flow

### Stage 1: Payment Method & Amount Selection
1. User opens Deposit page
2. **Selects Payment Method** from top 6 (UPI-QR, UPI x QR, E-Wallet, Paytm x QR, USDT-TRC20, ARPay)
3. **Selects Amount** from 9 presets OR enters custom amount (₹100-₹50,000)

### Stage 2: Payment Channel Selection (NEW - CLICKABLE)
4. User sees all 17 payment channels with balance ranges
5. **Clicks on any channel** (e.g., "OSPay - UPI x QR")
6. Frontend validates → Calls `/api/pay/create-order`
7. Backend creates order → Returns barcode & order ID
8. **Automatic Redirect** to Verify page

### Stage 3: UTR Submission
9. User sees barcode and instructions on Verify page
10. User performs transfer to the payment gateway
11. User enters **UTR number** (from bank receipt)
12. **Clicks Submit UTR**
13. Frontend validates UTR (12+ chars) → Calls `/api/pay/submit-utr`
14. Backend updates order status to `utr_submitted`
15. User redirected to wallet

### Stage 4: Admin Approval
16. Admin receives notification/views pending orders
17. Admin verifies transfer details
18. **Admin approves order** via admin dashboard (calls `/api/pay/admin-approve`)
19. Backend:
    - Calculates bonus (if applicable)
    - Updates user wallet balance
    - Marks order as `approved`
20. **User balance automatically updated**, amount appears in wallet

---

## Environment Variables Required

**.env (Backend)**
```
JWT_SECRET=your_jwt_secret_key
ADMIN_TOKEN=your_admin_secret_token
INSTAMOJO_API_KEY=...
INSTAMOJO_AUTH_TOKEN=...
MONGODB_URI=...
PORT=5000
```

**.env (Frontend)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Error Handling

### Frontend Validations:
- ✅ Amount minimum ₹100
- ✅ Amount maximum ₹50,000
- ✅ UTR minimum 12 characters
- ✅ Token verification on page load
- ✅ Order existence verification

### Backend Validations:
- ✅ Token verification
- ✅ User authorization
- ✅ Order existence
- ✅ Status transitions
- ✅ Admin token verification

---

## Testing Checklist

- [ ] Payment method tab selection (6 methods clickable)
- [ ] Amount preset buttons (9 values clickable)
- [ ] Custom amount input validation
- [ ] Channel list displays all 17 channels
- [ ] Channel click triggers order creation
- [ ] Order created successfully in database
- [ ] Redirect to verify-utr page with order data
- [ ] Barcode displays on verify page
- [ ] UTR validation (min 12 chars)
- [ ] UTR submission to backend
- [ ] Admin approve endpoint works
- [ ] Wallet balance updates after approval
- [ ] Bonus calculation correct

---

## API Testing Commands

### Create Order
```bash
curl -X POST http://localhost:5000/api/pay/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 500,
    "paymentMethod": "UPI-QR",
    "paymentChannel": "OSPay - UPI x QR"
  }'
```

### Submit UTR
```bash
curl -X POST http://localhost:5000/api/pay/submit-utr \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "orderId": "ORDER_ID_HERE",
    "utrNumber": "123456789012"
  }'
```

### Admin Approve
```bash
curl -X POST http://localhost:5000/api/pay/admin-approve \
  -H "Content-Type: application/json" \
  -H "admin-token: YOUR_ADMIN_TOKEN" \
  -d '{
    "orderId": "ORDER_ID_HERE",
    "approved": true
  }'
```

---

## Notes

1. **Channel Selection is Now Primary Flow**: Clicking any of the 17 channels directly creates an order
2. **Bonus Calculation**: Only BonusPay & 77Pay provide 1% bonus
3. **Status Progression**: pending → utr_submitted → approved (or rejected)
4. **Admin Panel Needed**: Create separate admin dashboard for approving orders
5. **Barcode Generation**: Currently mock, integrate actual barcode generation library if needed

---

## Next Steps

1. Create Admin Dashboard for order approval
2. Implement real QR code generation
3. Add email notifications for order status
4. Add transaction history display in wallet
5. Implement payment gateway webhooks
6. Add admin analytics for deposits

