
const mongoose = require("mongoose")
const itemSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants",
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    availablity: {
        type: Boolean,
        required: true
    },

})
const Item = mongoose.model("items", itemSchema);

module.exports = Item;