# Deposit Payment Flow - Backend API Required

## Frontend Changes Done ✅

1. **Deposit.js** - Main deposit page with:
   - Payment method selection (clickable tabs)
   - Amount selection (buttons + custom input)
   - Submit button that sends POST to server
   
2. **VerifyUTR.js** - New page with:
   - Barcode display
   - UTR input field
   - Submit button for UTR

## Backend APIs Required

### 1. Create Payment Order
**Endpoint:** `POST /api/payment/create-order`

**Request:**
```json
{
  "amount": 500,
  "paymentMethod": "UPI-QR",
  "status": "pending"
}
```

**Response (Success):**
```json
{
  "orderId": "ORDER_12345",
  "amount": 500,
  "paymentMethod": "UPI-QR",
  "barcode": "https://example.com/barcode.png",
  "status": "pending"
}
```

**Response (Error):**
```json
{
  "message": "Error creating order"
}
```

---

### 2. Submit UTR 
**Endpoint:** `POST /api/payment/submit-utr`

**Request:**
```json
{
  "orderId": "ORDER_12345",
  "utr": "123456789012",
  "status": "utr_submitted"
}
```

**Response (Success):**
```json
{
  "message": "UTR submitted successfully",
  "orderId": "ORDER_12345",
  "status": "utr_submitted"
}
```

---

### 3. Admin Approval (Backend Only)
When admin approves order from admin panel:
- Update order status: `pending` → `approved`
- Add amount to user's wallet
- Send notification to user

---

## Database Schema

### Orders Table
```
{
  orderId: String (Primary Key),
  userId: String,
  amount: Number,
  paymentMethod: String,
  utr: String (nullable),
  status: String (pending, utr_submitted, approved),
  barcode: String (URL),
  createdAt: DateTime,
  updatedAt: DateTime,
  adminApprovedAt: DateTime (nullable)
}
```

---

## Routing Setup Needed

Add to your App.js or routing config:

```javascript
import VerifyUTR from './Account/Deposit/VerifyUTR';

// In your router configuration:
<Route path="/deposit/verify-utr" element={<VerifyUTR />} />
```

---

## Features Implemented

✅ All buttons are now functional (clickable)
✅ Payment method selection works
✅ Amount selection works (preset + custom)
✅ No footer shown
✅ Deposit button submits to server
✅ Auto-navigates to VerifyUTR page with order data
✅ UTR submission to server
✅ Status tracking (pending → utr_submitted → approved)
✅ Wallet integration (on admin approval)

---

## Environment Variable

Add to your `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```
