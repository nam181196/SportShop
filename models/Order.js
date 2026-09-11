const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    brand:       { type: String, required: true },
    category:    { type: String, required: true },
    image:       { type: String },
    price:       { type: Number, required: true },
    quantity:    { type: Number, required: true, min: 1 },
    subtotal:    { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderCode: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        fullName: { type: String, required: true },
        email:    { type: String, required: true },
        phone:    { type: String, required: true },
        address:  { type: String, required: true },
        city:     { type: String, required: true }
    },
    items:       [orderItemSchema],
    totalAmount: { type: Number, required: true },
    discount:    { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled', 'returned'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'banking', 'momo', 'zalopay', 'vnpay'],
        default: 'COD'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid', 'refunded'],
        default: 'unpaid'
    },
    note:      { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
