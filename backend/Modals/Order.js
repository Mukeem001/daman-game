const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 100
    },
    paymentMethod: {
        type: String,  // UPI-QR, E-Wallet, USDT-TRC20, etc.
        required: true
    },
    paymentChannel: {
        type: String,  // OSPay, WinPay, BonusPay, etc.
        required: true
    },
    barcode: {
        type: String,  // QR code or barcode data
        default: null
    },
    utrNumber: {
        type: String,  // UTR submitted by user
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'utr_submitted', 'approved', 'rejected', 'failed'],
        default: 'pending'
    },
    adminNotes: {
        type: String,
        default: null
    },
    bonus: {
        type: Number,
        default: 0  // Bonus percentage/amount
    },
    finalAmount: {
        type: Number,  // Amount after bonus
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    utrSubmittedAt: {
        type: Date,
        default: null
    },
    approvedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
