import Booking from "../models/booking.js";
import Trip from "../models/Trip.js";

export const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};

export const findBookingById = async (bookingId) => {
  return await Booking.findById(bookingId)
    .populate("customer", "name email")
    .populate(
      "car",
      "brand model images pricePerDay location bookingCount owner",
    ).populate("trip");
};

//booking history,to get every type of Booking

export const findUserBookings = async (userId, bookingStatus) => {
  const filters = {
    customer: userId,
  };

  if (bookingStatus) {
    filters.bookingStatus = bookingStatus;
  }

  return await Booking.find(filters).populate("car").populate("trip").sort({ createdAt: -1 });
};

//booking updation(details,status)

export const updateBooking = async (bookingId, updatedData) => {
  return await Booking.findByIdAndUpdate(bookingId, updatedData, {
    new: true,
    runValidators: true,
  });
};

// if a car is already booked
export const findActiveBooking = async (carId) => {
  return await Booking.findOne({
    car: carId,
    bookingStatus: {
      $in: ["Pending", "Confirmed"],
    },
  });
};

export const createTrip = async (tripData) => {
  return await Trip.create(tripData);
};

export const getOwnerBookings = async (ownerId) => {
  return await Booking.find({
    owner: ownerId,
  })
    .populate("car")
    .populate("customer")
    .populate("trip");
};

export const getOwnerRevenueBookings = async (ownerId) => {
  return await Booking.find({
    owner: ownerId,
    bookingStatus: { $in: ["Confirmed", "Completed"] },
  });
};
