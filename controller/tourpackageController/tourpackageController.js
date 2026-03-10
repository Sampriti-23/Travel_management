const TourPackage = require("../../models/TourPackage");
const Booking = require("../../models/Booking");
// create package
exports.createpackage = async (req,res)=>{
    try{
        const package = new TourPackage(req.body);
        await package.save();
        res.status(201).json(package);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

//get all package
exports.getallpackage = async(req,res)=>{
    try{
        const packages = await TourPackage.find();
        res.json(packages)
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

//get package by id
exports.getpackagebyid = async (req, res) => {
  try {
    const package = await TourPackage.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.json(package);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//update package
exports.updatepackage = async(req,res)=> {
    try{
    const package = await TourPackage.findByIdAndUpdate(req.params.id, req.body,{new: true})
    if(!package){
        res.status(400).json({err: err.message})
    }
    res.status(200).json({
        message: "Package Updated Successfully",
        data : package
    });
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

//delete package
exports.deletepackage = async(req,res)=>{
    try{
        const package =  await TourPackage.findByIdAndDelete(req.params.id)
        if(!package){
            res.status(400).json({message : "Package not found "})
        }
        res.status(200).json({ message : "Package deleted successfully"})
    }catch(err){
        res.status(400).json({err: err.message});
    }
}