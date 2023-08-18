const express = require('express')
const bodyParser = require('body-parser');
const CartProducts = require('../models/cartProd');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter.route('/')
.get((req, res, next)=>{
    CartProducts.find({})
    .then((cartprod)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cartprod)
    })
    .catch((err)=>next(err))
})
.delete((req,res,next)=>{
    CartProducts.remove({})
    .then((res)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
    })
    .catch((err)=>next(err));
})



cartRouter.route('/:prodID')
.get((req, res, next)=>{
    CartProducts.findById(req.params.prodID)
    .then((cartprod)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cartprod);
    })
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{
    CartProducts.findByIdAndRemove(req.params.prodID)
    .then((res)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
    })
    .catch((err)=>next(err));
})



module.exports = cartRouter;