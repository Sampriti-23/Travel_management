const Booking = require("../../models/Booking");
const Room = require("../../models/Room");
const Hotel = require("../../models/Hotel");
const User = require("../../models/User");
const TourPackage = require("../../models/TourPackage")

//create booking 
exports.createbooking = async(req,res)=>{
    try{
        const book = new Booking(req.body);
        await book.save();
        res.status(201).json(book);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

//get all booking
exports.getroom = async (req, res) => {
  try {
    const books = await Booking.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//update Booking
