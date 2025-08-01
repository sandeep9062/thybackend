// models/SliderImage.js
import mongoose from "mongoose";

const sliderImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const SliderImage = mongoose.model("SliderImage", sliderImageSchema);

export default SliderImage;
