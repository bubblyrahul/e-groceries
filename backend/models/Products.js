const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    userId: {type:String, required:true},
    name: { type: String,required: true,},
    description: {type: String,required: true,},
    photo: {type: String,},
    price: {type: Number,required: true,},
    quantity: {type: String,required: true,},
    count: {type: Number,default: 50},
    category: {type: String,required: true,},
    });

const Products = mongoose.model('Products', productSchema)
module.exports = Products