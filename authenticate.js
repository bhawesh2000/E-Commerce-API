var passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;

var ExtractJWT= require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var Config = require('./config');
const Users = require('./models/user');

//creating token
exports.getToken = function(user){
    return jwt.sign(user , Config.secretKey , {expiresIn:3600});
}

//configuring JWT based strategy

var opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Config.secretKey;

//configure strategy
/**
 jwt strategy that we'll create will have 2 parameter 1st options (that just created) and 2nd verify function which is callback func.
 verify function have two parameter -
 1st is jwt_payload ->containing decoded jwt payload
 2nd is done ->this is callback fun., through done I will pass information back to passport it has 3 parameter 1st err, 2nd user? if exist and 3rd info? if exist 
 */
exports.jwtPassport = passport.use(new JWTStrategy(opts , (jwt_payload , done)=>{

    console.log('JWT-payload' , jwt_payload );
    Users.findOne({_id: jwt_payload._id} , (err , user)=>{
        if(err){
            return done(err , false);
        }
        else if(user){
            return done(null , user); //user exists
        }
        else{
            return done(null , false); //could not find user
        }
    });


} ));

//create and then export VerifyUser function to verify an incomming user 
//1st parameter is jwt strategy and second is we're not creating session in JWT thus false
exports.VerifyUser = passport.authenticate('jwt' , {session:false}); 
exports.VerifyAdmin = (req , res , next)=>{
     User.findOne({_id:req.user._id})
     .then((user)=>{
          console.log("User:", req.user);
          if(user.admin)
          {
               next();
          }
          else
          {
               var err = new Error('you are not authorized to perform this operation');
               err.status = 403;
               return(next(err));
          }
     } , (err)=> next(err))
     .catch((err)=>next(err))
};
