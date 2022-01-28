const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    street_address: { type: String },
    city: { type: String },
    zip_code: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
