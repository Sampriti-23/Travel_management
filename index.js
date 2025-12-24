const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute/userRoutes");
const hotelRoute = require("./routes/hotelRoutes/hotelRoute");
const roomRoute = require("./routes/roomRoutes/roomRoute");
const tourpackageRoute = require("./routes/tourpackageRoutes/tourpackageRoutes");
const bookingRoute = require("./routes/bookingRoutes/bookingRoute");

dotenv.config();
const app = express();


app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);
app.use("/api/tourpackage",tourpackageRoute);
//app.use("/api",bookingRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
