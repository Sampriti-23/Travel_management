// const User = require("../../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


// exports.createDefaultAdmin = async (req,res) => {
//   try {
//     const existingAdmin = await User.findOne({ email: req?.body.email });

//     if (!existingAdmin) {
//       const hashedPassword = await bcrypt.hash(req?.body.password, 10);

//       const admin = await User.create({
//         name: "Admin",
//         email: req?.body.email,
//         phone: "9999999999",
//         password: hashedPassword,
//         role: "admin"
//       });

//     //   console.log("✅ Default Admin Created");
//     //   console.log("Email:", adminEmail);
//     //   console.log("Password:", adminPassword);
//     } else {
//       console.log("ℹ️ Admin already exists");
//     }

//   } catch (error) {
//     console.error("Error creating default admin:", error);
//   }
// };