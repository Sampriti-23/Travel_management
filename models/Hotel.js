const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name:{type: String,require:true},
    location:{type:String, require:true},
    description: {type:String},
   // image: String,
    rating:{type:Number, default: 0},
    rooms: [{type:mongoose.Schema.Types.ObjectId,ref:"Rooms"}],
    amenities: [String]
});
module.exports=mongoose.model("Hotel",hotelSchema);