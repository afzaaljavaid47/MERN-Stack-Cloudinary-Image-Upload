const mongoose=require('mongoose');
const {Schema}= mongoose;

const productSchema=new Schema({
    name:{
        type:String,
        required:[true,"Product name is required"]
    },
    price:{
        type:String,
        required:[true,"Product price is required"]
    },
    category:{
        type:String,
        required:[true,"Product category is required"],
        enum:['health','sugar']
    },
    farm:[
        {
            type:Schema.Types.ObjectId,
            ref:'Farm'
        }
    ]
})

const productModel=mongoose.model('Products',productSchema);

module.exports=productModel;