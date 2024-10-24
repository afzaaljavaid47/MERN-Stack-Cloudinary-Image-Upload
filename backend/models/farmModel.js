const mongoose = require('mongoose');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, "Farm name is required"]
    },
    city: {
        type: String,
        required: [true, "Farm city is required"]
    },
    email: {
        type: String,
        required: [true, "Farm email is required"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    ]
});

const farmModel = mongoose.model('Farm', farmSchema);

module.exports = farmModel;
