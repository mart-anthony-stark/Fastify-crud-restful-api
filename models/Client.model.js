const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    zip_code: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
