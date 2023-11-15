const mongoose = require("mongoose");

const ApplySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    discipline: {
      type: String,
      required: true,
    },
    resume: {
      type: Buffer,
    },
    specialty: {
      type: String,
      required: true,
    },
    otherSpecialty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Apply", ApplySchema);
