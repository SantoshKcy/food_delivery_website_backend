const mongoose = require("mongoose")
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})
const Item = mongoose.model("items", itemSchema);

module.exports = Item;