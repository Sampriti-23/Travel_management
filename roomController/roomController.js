const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

//  Create Room
exports.createroom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    await Hotel.findByIdAndUpdate(room.hotel, { $push: { rooms: room._id } });
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Get All Rooms
exports.getroom = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update Room
exports.updateroom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Delete Room
exports.deleteroom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    await Hotel.findByIdAndUpdate(room.hotel, { $pull: { rooms: room._id } });
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
