var express = require('express');
var router = express.Router();
var CampGroundModel = require('../models/CampGroundModel');
const {cloudinary,deleteImage, deleteMultipleImages} = require('./cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'CampGrounds',
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
    }
  });
  
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   });

const upload = multer({ storage });

router.get('/', async (req, res, next) => {
    try {
        var CampGroundItems = await CampGroundModel.find({});
        console.log(CampGroundItems);
        res.status(200).send(CampGroundItems);
    } catch (err) {
        console.error("Error fetching CampGround items: ", err);
        res.status(500).send({
            message: "Failed to fetch CampGround items",
            error: err.message
        });
    }
});

router.post('/', upload.array('images'), async (req, res, next) => {
    try { 
      if (!req.body.title || !req.body.description || !req.body.address) {
        return res.status(400).json({ error: "Title, description, and address are required." });
      } 
      const newCampGround = new CampGroundModel({
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        images: req.files.map(file => file.filename)
      });  
      await newCampGround.save();
      res.status(201).json({
        message: 'CampGround added successfully',
        campground: newCampGround,
      });
    } catch (err) {
      console.error('Error saving campground:', err);
      res.status(500).json({ error: err.message });
    }
  });

router.delete('/',async (req,res,next)=>{
    try{
        var {id}=req.body;
        var findCampGround=await CampGroundModel.findById(id);
        console.log(findCampGround)
        if(findCampGround){
          console.log(findCampGround.images)
          if(findCampGround.images.length>1)
          {
            await deleteMultipleImages(findCampGround.images);
          }
          else
          {
            await deleteImage(findCampGround.images);
          }
          await CampGroundModel.findByIdAndDelete(id);
          res.status(201).send('Camp Ground deleted successfully.');
        }
        else
        {
          res.status(400).send({error:"Camp Ground not found."});
        } 
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;