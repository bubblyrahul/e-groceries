const mongoose = require('mongoose');
const {Schema} = mongoose;

const AddressSchema = new Schema({
    userId: {type:String, required:true},
    houseNumber: {type: Number, required:true},
    street: {type:String, required:true},
    city: {type:String, required:true},
    state: {type:String, required:true},
    country: {type:String, required:true},
    zipCode: {type: Number, required:true}
})

const Address = mongoose.model('address', AddressSchema)
module.exports = Address