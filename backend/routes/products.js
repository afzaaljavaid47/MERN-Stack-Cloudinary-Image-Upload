var express = require('express');
var router = express.Router();
var productModel = require('../models/productModel');
var farmModel = require('../models/farmModel');

router.get('/', async (req, res, next) => {
    try {
        var productList = await productModel.find({}).populate("farm");
        console.log(productList);
        res.status(200).send(productList);
    } catch (err) {
        console.error("Error fetching product items: ", err);
        res.status(500).send({
            message: "Failed to fetch product items",
            error: err.message
        });
    }
});

router.post('/add/:id',async (req,res,next)=>{
    try{
        var {id}=req.params;
        var findFarm=await farmModel.findById(id);
        var product=new productModel(req.body);
        product.farm.push(findFarm);
        findFarm.products.push(product);
        await findFarm.save();
        await product.save();
        res.send('Product and Farm added and updated successfully. '+product);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;
