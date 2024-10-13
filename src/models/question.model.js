const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    region: {
        type: Schema.Types.ObjectId, 
    },
    assigned:{
        type:Schema.Types.Boolean,
        default:false
    }
  },
  { timestamps: true }
);


const Question = mongoose.model("Question", questionSchema, "questions");

module.exports = Question;