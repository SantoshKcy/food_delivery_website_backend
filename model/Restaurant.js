const mongoose = require("mongoose")
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    openHours: {
        type: Date,
        required: true
    },
    closeHours: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

})
const Restaurant = mongoose.model("restaurants", restaurantSchema);

module.exports = Restaurant