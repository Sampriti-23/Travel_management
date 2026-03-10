const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },

  // store all room ids
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],

  amenities: [String]
});

module.exports = mongoose.model("Hotel", hotelSchema);