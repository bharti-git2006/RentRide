import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Car from "../models/Car.js";

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

    const admin= await User.create({
      name: "Super Admin",
      email: "admin@rentride.com",
      password: hashedPassword,
      role: "admin",
      ownerStatus: "approved",
    });
    console.log("Admin account created successfully.");

    const cars = [
      {
        brand: "BMW",
        model: "X5",
        registrationNumber: "DLRF22454",
        year: 2023,
        category: "SUV",
        pricePerDay: 80,
        location: "New Delhi",
        seatingCapacity: 5,
        fuel: "Petrol",
        transmission: "Automatic",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        description:
          "A commanding SUV with a smooth ride, generous cabin space, and confident handling on any road.",
        owner: admin._id,
      },
      {
        brand: "Audi",
        model: "A4",
        registrationNumber: "DLRF22776",
        year: 2022,
        category: "Sedan",
        pricePerDay: 70,
        location: "New Delhi",
        seatingCapacity: 5,
        fuel: "Petrol",
        transmission: "Automatic",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        description:
          "Understated luxury sedan that balances comfort, efficiency, and everyday practicality.",
        owner: admin._id,
      },
      {
        brand: "Mercedes-Benz",
        model: "S-Class",
        registrationNumber: "DLRF2244856",
        year: 2023,
        category: "Luxury",
        pricePerDay: 180,
        location: "Mumbai",
        seatingCapacity: 4,
        fuel: "Petrol",
        transmission: "Automatic",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800",
        owner: admin._id,
        description:
          "The flagship of refined travel — quiet, powerful, and finished to the last detail.",
      },
      {
        brand: "Toyota",
        model: "Innova Crysta",
        registrationNumber: "DLRF112456",
        year: 2022,
        category: "SUV",
        pricePerDay: 60,
        location: "Mumbai",
        seatingCapacity: 7,
        fuel: "Diesel",
        transmission: "Manual",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800",
        owner: admin._id,
        description:
          "Spacious, dependable, and family-friendly — built for long drives with room to spare.",
      },
      {
        brand: "Honda",
        model: "City",
        registrationNumber: "DLRF32456",
        year: 2023,
        category: "Sedan",
        pricePerDay: 40,
        location: "Bengaluru",
        seatingCapacity: 5,
        fuel: "Petrol",
        transmission: "Automatic",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
        owner: admin._id,
        description:
          "A well-mannered sedan with responsive handling and a comfortable, quiet cabin.",
      },
      {
        brand: "Tesla",
        model: "Model 3",
        registrationNumber: "DLRF22477",
        year: 2024,
        category: "Luxury",
        pricePerDay: 120,
        location: "New Delhi",
        seatingCapacity: 5,
        fuel: "Electric",
        transmission: "Automatic",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1554744512-d6c603f27c54?w=800",
        owner: admin._id,
        description:
          "Instant torque, minimalist cabin, and zero emissions — driving reimagined.",
      },
      {
        brand: "Mahindra",
        model: "Thar",
        registrationNumber: "DLRF22456",
        year: 2023,
        category: "SUV",
        pricePerDay: 55,
        location: "Jaipur",
        seatingCapacity: 4,
        fuel: "Diesel",
        transmission: "Manual",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
        owner: admin._id,
        description:
          "Rugged and raw — built for off-road adventure and open-top thrills.",
      },
      {
        brand: "Maruti Suzuki",
        model: "Swift",
        registrationNumber: "DKKLF22456",
        year: 2023,
        category: "SUV",
        pricePerDay: 28,
        location: "Jaipur",
        seatingCapacity: 5,
        fuel: "Petrol",
        transmission: "Manual",
        rating: 4.2,
        image:
          "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800",
        owner: admin._id,
        description:
          "Nimble, economical, and easy to park — the practical choice for city driving.",
      },
    ];

    await Car.insertMany(cars);
    console.log("Demo car data seeded successfully");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedAdmin();
