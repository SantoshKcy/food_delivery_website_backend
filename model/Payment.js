
const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    paidAt: {
        type: Date,
        default: Date.now
    },



})
const Payment = mongoose.model("payments", paymentSchema);

module.exports = Payment;