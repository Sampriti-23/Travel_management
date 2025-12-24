const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

// Create Hotel
exports.createhotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Get All Hotels
exports.gethotel = async (req, res) => {
  try {
    const hotels = await Hotel.find(); // you can add .populate("rooms") if needed
    res.status(200).json({
      message: "Hotels fetched successfully",
      data: hotels,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update Hotel
exports.updatehotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.status(200).json({
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Delete Hotel
exports.deletehotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // Optional: also delete rooms linked to this hotel
    await Room.deleteMany({ hotel: req.params.id });

    res.status(200).json({
      message: "Hotel and related rooms deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
