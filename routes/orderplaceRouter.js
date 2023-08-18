const express =require('express')
const bodyParser = require('body-parser')

const orderplaceRouter = express.Router();
orderplaceRouter.use(bodyParser.json());

orderplaceRouter.route('/')
.get((req, res, next)=>{
    res.end("order is placed")
})

module.exports=orderplaceRouter;