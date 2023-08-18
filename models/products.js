const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type: Currency,
        required:true,
        min:0
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    timestamps:true
});

var Products = mongoose.model('Product', productSchema)
module.exports=Products