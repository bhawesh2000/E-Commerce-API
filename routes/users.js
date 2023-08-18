const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/user');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req,res,next)=>{
  Users.find({})
  .then((users)=>{
    res.statusCode=200;
    res.setHeader('content-type', 'application/json');
    res.json(users);
  },(err)=> next(err))
  .catch((err)=>next(err));
})


userRouter.post('/signup', (req, res, next)=>{

  //passport provide register method  for signup
  Users.register(new Users({username: req.body.username}), req.body.password, (err , user)=>{
    if(err){
      res.statusCode=500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err:err});
    }
    else{
      if(req.body.firstname)
      user.firstname = req.body.firstname;
      if(req.body.lastname)
      user.lastname = req.body.lastname;

      user.save((err, user)=>{
        if(err) {
          res.statusCode=500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err:err});
          return;
        }
        passport.authenticate('local')(req ,res , ()=>{ //we authenticate the user we have register. authenticate method itself automatically do authentication
          res.statusCode=200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success:true , status:'Registration Successful'});
        });
      });

    }
  });

});

userRouter.post('/login', passport.authenticate('local') , (req,res)=>{ 

  //once user is authenticate we issue token to user
  var token = authenticate.getToken({_id: req.user._id});  //user id is payload
  res.statusCode=200; 
  res.setHeader('Content-Type', 'application/json');
  res.json({success:true , token:token , status: 'you are logged in successfully!'});
});


module.exports = userRouter;
