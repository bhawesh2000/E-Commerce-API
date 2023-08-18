const express =require('express')
const bodyParser = require('body-parser')

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.route('/')
.get((req, res, next)=>{
    res.end("will show all category")
})

module.exports=categoryRouter;

