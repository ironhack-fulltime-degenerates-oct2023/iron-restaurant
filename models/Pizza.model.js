const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const {mongoose, Schema} = require("mongoose");

const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    isVeggie: {
        type: Boolean,
        default: false
    },
    ingredients: [String],
    dough: {
        type: String,
        enum: ["classic", "extra thin", "with cheese", "with garlic"]
    }
});


const Pizza = mongoose.model("Pizza", pizzaSchema);


module.exports = Pizza;