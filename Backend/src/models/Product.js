const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true,
    },

    und:{
        type: String,
        required: true,
    },

},{
    timestamps: true,
});

module.exports = model('Product', ProductSchema);