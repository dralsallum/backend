const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    titleEng: { type: String, required: true },
    desc: { type: String, required: true },
    listOne: { type: String, required: true },
    listTwo: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    hospital: { type: String, required: true },
    img: { type: String, required: true },
    duration: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
