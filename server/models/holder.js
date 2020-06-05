var mongoose = require("mongoose");


var holderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required:true,
      trim: true
    },
    encrypt: {
      type: Boolean,
      required: true,
    },
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Holder", holderSchema);
