const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true
    },
    cartItems: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item", // Assuming you have an Item model
                required: true
            },
            quantity: {
                type: Number, // Changed to Number
                required: true
            },
            price: {
                type: Number, // Changed to Number
                required: true
            }
        }
    ],
    billingDetails: {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'khalti'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'], // Payment status
        default: 'pending' // Default status
    },
    subtotal: {
        type: Number, // Changed to Number
        required: true
    },
    deliveryCharge: {
        type: Number, // Changed to Number
        required: true
    },
    totalPrice: {
        type: Number, // Changed to Number
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'completed', 'cancel'],
        default: 'pending' // Default order status
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
