const mongoose = require("mongoose")
const wishlistSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})
const Wishlist = mongoose.model("wishlists", wishlistSchema);

module.exports = Wishlist;