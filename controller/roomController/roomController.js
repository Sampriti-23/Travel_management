const Room = require("../../models/Room");
const Hotel = require("../../models/Hotel");


/* ========================
   CREATE ROOM
======================== */

exports.createroom = async (req, res) => {
  try {

    const room = await Room.create(req.body);

    // add room id to hotel
    await Hotel.findByIdAndUpdate(room.hotel, {
      $push: { rooms: room._id }
    });

    const populatedRoom = await Room.findById(room._id)
      .populate("hotel", "name location");

    res.status(201).json({
      message: "Room created successfully",
      data: populatedRoom,
      status_code: 201
    });

  } catch (err) {

    res.status(400).json({
      message: "Error creating room",
      error: err.message
    });

  }
};



/* ========================
   GET ALL ROOMS
======================== */

exports.getroom = async (req, res) => {
  try {

    const rooms = await Room.find()
      .populate("hotel", "name location")
      .lean();

    res.status(200).json({
      message: "Rooms fetched successfully",
      data: rooms,
      status_code: 200
    });

  } catch (err) {

    res.status(500).json({
      message: "Error fetching rooms",
      error: err.message
    });

  }
};



/* ========================
   UPDATE ROOM
======================== */

exports.updateroom = async (req, res) => {
  try {

    const oldRoom = await Room.findById(req.params.id);

    if (!oldRoom) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("hotel", "name location");

    // if hotel changed
    if (
      req.body.hotel &&
      oldRoom.hotel.toString() !== req.body.hotel
    ) {

      // remove from old hotel
      await Hotel.findByIdAndUpdate(oldRoom.hotel, {
        $pull: { rooms: oldRoom._id }
      });

      // add to new hotel
      await Hotel.findByIdAndUpdate(req.body.hotel, {
        $push: { rooms: oldRoom._id }
      });

    }

    res.status(200).json({
      message: "Room updated successfully",
      data: updatedRoom,
      status_code: 200
    });

  } catch (err) {

    res.status(400).json({
      message: "Error updating room",
      error: err.message
    });

  }
};



/* ========================
   DELETE ROOM
======================== */

exports.deleteroom = async (req, res) => {
  try {

    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    // remove room id from hotel
    await Hotel.findByIdAndUpdate(room.hotel, {
      $pull: { rooms: room._id }
    });

    res.status(200).json({
      message: "Room deleted successfully",
      status_code: 200
    });

  } catch (err) {

    res.status(400).json({
      message: "Error deleting room",
      error: err.message
    });

  }
};