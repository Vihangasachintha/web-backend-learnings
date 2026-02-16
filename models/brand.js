import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  status:{
    type: String,
    required: true,
    default: "active",
  }
});

const Brand = mongoose.model("brands", brandSchema);

export default Brand;