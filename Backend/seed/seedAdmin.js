import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Car from "../models/Car.js";

import { cars } from "./cars.js";

await Car.insertMany(cars);

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Super Admin",
      email: "admin@rentride.com",
      password: hashedPassword,
      role: "admin",
      ownerStatus: "approved",
    });

    console.log("Admin account created successfully.");

    await Car.insertMany(cars);
    console.log("Demo car data seeded successfully");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedAdmin();
