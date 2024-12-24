
const mongoose = require("mongoose")
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    subacategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories",
    }

})
const Item = mongoose.model("items", itemSchema);

module.exports = Item;