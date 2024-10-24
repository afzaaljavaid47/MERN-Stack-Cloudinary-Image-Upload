var express = require('express');
var router = express.Router();
var farmModel = require('../models/farmModel');
var productModel = require('../models/productModel');

router.get('/', async (req, res, next) => {
    try {
        var farmsItems = await farmModel.find({}).populate("products");
        console.log(farmsItems);
        res.status(200).send(farmsItems);
    } catch (err) {
        console.error("Error fetching farm items: ", err);
        res.status(500).send({
            message: "Failed to fetch farm items",
            error: err.message
        });
    }
});

router.post('/add',async (req,res,next)=>{
    try{
        var farm=new farmModel(req.body);
        await farm.save();
        res.send('Farm added successfully'+farm);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

router.delete('/delete/:id',async (req,res,next)=>{
    try{
        var {id}=req.params;
        var findFarm=await farmModel.findById(id);
        var deleteProducts=await productModel.deleteMany({_id:{$in:findFarm.products}})
        var deleteFarm=await farmModel.findByIdAndDelete(id);
        res.send('Farm deleted successfully.'+findFarm);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;
