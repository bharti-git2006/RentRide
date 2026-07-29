import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    dropLocation: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Running", "Completed"],
      default: "Pending",
    },

    currentIndex: {
      type: Number,
      default: 0,
    },

    totalDistance: {
      type: Number,
      default: 0,
    },

    averageSpeed: {
      type: Number,
      default: 0,
    },

    isSimulationRunning: {
      type: Boolean,
      default: false,
    },

    route: {
      type: [
        {
          latitude: Number,
          longitude: Number,
          speed: Number,
        },
      ],
      default: [],
    },

    startedAt: Date,

    endedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Trip", tripSchema);
