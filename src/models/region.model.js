const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    currentQuestion: {
      type: Schema.Types.ObjectId, 
    },
    cycleDuration:{
        type:Number,
        default:7
    },
    nextCycleStartDate:{
        type:Date
    }
  },
  { timestamps: true }
);


const Region = mongoose.model("Region", regionSchema, "regions");

module.exports = Region;