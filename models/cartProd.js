const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;

const cartSchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type: Currency,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

const CartProducts = mongoose.model('CartProduct' , cartSchema)
module.exports=CartProducts;