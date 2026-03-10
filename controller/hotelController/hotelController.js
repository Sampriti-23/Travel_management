const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");

/* ========================
   CREATE HOTEL
======================== */
exports.createhotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      message: "Hotel created successfully",
      data: hotel,
      status_code: 201
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


/* ========================
   GET ALL HOTELS
======================== */
exports.gethotel = async (req, res) => {
  try {
    const hotels = await Hotel.find()
      .populate({
        path: "rooms",
        select: "roomType -_id"
      })
      .lean();   // makes transformation easier

    // convert rooms → ["Deluxe","Suite"]
    const formattedHotels = hotels.map(hotel => ({
      ...hotel,
      rooms: hotel.rooms.map(room => room.roomType)
    }));

    res.status(200).json({
      message: "Hotels fetched successfully",
      data: formattedHotels,
      status_code: 200
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ========================
   UPDATE HOTEL
======================== */
exports.updatehotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate({
      path: "rooms",
      select: "roomType -_id"
    })
    .lean();

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    hotel.rooms = hotel.rooms.map(room => room.roomType);

    res.status(200).json({
      message: "Hotel updated successfully",
      data: hotel,
      status_code: 200
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


/* ========================
   DELETE HOTEL
======================== */
exports.deletehotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // delete all rooms belonging to this hotel
    await Room.deleteMany({ hotel: req.params.id });

    res.status(200).json({
      message: "Hotel and related rooms deleted successfully",
      status_code: 200
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};