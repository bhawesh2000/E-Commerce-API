const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//passport-local-mongoose provide mongoose plugin which automatically adds username and encrypted way of storing password in hashed way.
//passport-local mongoose also adds additional methods etc to user schema
var passportLocalMongoose = require('passport-local-mongoose');

// now creating user schema
const UserSchema = new Schema({

    //we remove username and password as it will be automatically added by passport-local-mongoose
    /**   
        username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },
    
    */

    firstname:{
        type:String,
        default:''
    },

    lastname:{
        type:string,
        default:''
    },

    admin:{
        type:Boolean,
        default:false
    }

});

//using password-local-mongoose as plugin

UserSchema.plugin(passportLocalMongoose);

//creating model for this schema
var Users = mongoose.model('User' , UserSchema); // user is model name and UserSchema is schema

module.exports= Users;