const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
        type: String,
      required: true,
      unique: true,
    },
    region: {
      type: Schema.Types.ObjectId, 
    }
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema, "users");

module.exports = User;