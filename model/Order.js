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
        required: true
    },
    price: {
        type: Integer,
        required: true
    },
    quantity: {
        type: Integer,
        required: true
    },

    status: {
        type: String,
        required: true
    }

})
const Order = mongoose.model("orders", orderSchema);

module.exports = Order;