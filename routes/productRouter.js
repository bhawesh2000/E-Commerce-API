const express = required('express')
const bodyParser = require('body-parser');
const Products = require('../models/products');

const productRouter=express.Router();

productRouter.use(bodyParser.json()); // means will parse only data that is in json format

productRouter.route('/')
.get((req, res,next)=>{
    Products.find({})
    .then((products)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products)
    })
    .catch((err)=>next(err));
})
.post((req, res, next)=>{
    Products.create(req.body)
    .then((product)=>{
        console.log('product created', product);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    })
    .catch((err)=>next(err));
})


productRouter.route('/:prodID')
.get((req, res, next)=>{
    Products.findById(req.params.prodID)
    .then((product)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    })
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    Products.findByIdAndUpdate(req.params.prodID)
    .then((product)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    })
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{
    Products.findByIdAndRemove(req.params.prodID)
    .then((res)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(res);
    })
    .catch((err)=>next(err));
})


module.exports = productRouter;