
const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
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
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },



})
const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;