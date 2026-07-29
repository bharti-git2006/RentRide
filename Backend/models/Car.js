import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    category: {
      type: String,
      enum: ["Hatchback", "Sedan", "SUV", "Luxury", "Sports"],
      required: true,
    },

    fuel: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },

    seatingCapacity: {
      type: Number,
      required: true,
    },

    mileage: {
      type: Number,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 3,
    },

    location: {
      type: String,
      required: true,
    },

    image: [
      {
        type: String,
      },
    ],

    isAvailable: {
      //availability for booking
      type: Boolean,
      default: true,
    },

    isActive: {
      //soft delete
      type: Boolean,
      default: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approvalStatus: { //approval for car operation
      type: String,
      enum: ["none","Pending", "Approved", "Rejected"],
      default: "none",
    },

    bookingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
console.log("CarSchema new version");
const Car = mongoose.model("Car", carSchema);

export default Car;
