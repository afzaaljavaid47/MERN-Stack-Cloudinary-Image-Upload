const mongoose = require('mongoose');
const { Schema } = mongoose;

const campGroundSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      images: [
        {
          type: String,
        },
      ],
});

const CampGroundModel = mongoose.model('CampGround', campGroundSchema);

module.exports = CampGroundModel;
