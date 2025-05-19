const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    configuration: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("showcasetemplates", templateSchema);