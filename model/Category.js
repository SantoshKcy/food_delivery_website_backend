const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },


})
const Category = mongoose.model("categories", customerSchema);

module.exports = Category