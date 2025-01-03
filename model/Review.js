
const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },



})
const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;