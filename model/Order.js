const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items"
    },

    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },

})
const Order = mongoose.model("orders", orderSchema);

module.exports = Order;