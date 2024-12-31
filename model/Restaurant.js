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
    phonenumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    openhours: {
        type: Date,
        required: true
    },
    closehours: {
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