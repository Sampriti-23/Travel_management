const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomType: { type: String, required: true }, // e.g., deluxe, suite
  pricePerNight: { type: Number, required: true },
  capacity: { type: Number, required: true },
  available: { type: Boolean, default: true },
  image: [String]
});

module.exports = mongoose.model("Room", roomSchema);
