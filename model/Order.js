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
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"
    },

    date: {
        type: Date,
        required: true
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
        type: String,
        required: true
    },

})
const Order = mongoose.model("orders", orderSchema);

module.exports = Order;