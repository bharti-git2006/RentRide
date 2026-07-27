import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(

    {

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
            required: true,
        },

        pickupDate: {
            type: Date,
            required: true,
        },

        returnDate: {
            type: Date,
            required: true,
        },

        pickupLocation: {
            type: String,
            required: true,
        },

        totalDays: {
            type: Number,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        bookingStatus: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Completed",
                "Cancelled",
            ],
            default: "Pending",
        },

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Paid",
            ],
            default: "Pending",
        },

    },

    {
        timestamps: true,
    }

);

const Booking = mongoose.model(
    "Booking",
    bookingSchema
);

export default Booking;