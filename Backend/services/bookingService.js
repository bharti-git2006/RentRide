import {
  createBooking,
  findBookingById,
  findUserBookings,
  updateBooking,
  findActiveBooking,
  createTrip,
  getOwnerBookings,
  getOwnerRevenueBookings,
} from "../repositories/bookingRepository.js";

import Trip from "../models/Trip.js";

import {
  findCarById,
  updateAvailability,
} from "../repositories/carRepository.js";

import calculatePrice from "../utils/calculatePrice.js";

export const bookCar = async (bookingData, customerId) => {
  const car = await findCarById(bookingData.car);

  if (!car || !car.isActive) {
    throw new Error("Car not found.");
  }

  if (!car.isAvailable) {
    throw new Error("This car is currently unavailable.");
  }

  const activeBooking = await findActiveBooking(bookingData.car);

  if (activeBooking) {
    throw new Error("This car has already been booked.");
  }

  const pickupDate = new Date(bookingData.pickupDate);

  const returnDate = new Date(bookingData.returnDate);

  const discount = bookingData.coupon;

  if (returnDate <= pickupDate) {
    throw new Error("Return date must be after pickup date.");
  }

  const { totalDays, totalPrice } = calculatePrice(
    pickupDate,
    returnDate,
    car.pricePerDay,
    discount,
  );

  bookingData.customer = customerId;
  bookingData.owner = car.owner;
  bookingData.totalDays = totalDays;
  bookingData.totalPrice = totalPrice;

  const booking = await createBooking(bookingData);

  await updateAvailability(bookingData.car, false);

  //increasing the bookingcount of car
  car.bookingCount = car.bookingCount+ 1;
  await car.save();

  const trip = await createTrip({
    booking: booking._id,
    customer: booking.customer,
    owner: car.owner,
    car: booking.car,
    pickupLocation: booking.pickupLocation,
    dropLocation: booking.dropLocation,
    route: [],
    currentIndex: 0,
    status: "Pending",
  });
  // Link Trip to Booking (only if you added trip field in Booking model)
  booking.trip = trip._id;
  await booking.save();

  return booking;
};

export const getBookingHistory = async (customerId, bookingStatus) => {
  //get all booking history of a user
  return await findUserBookings(customerId, bookingStatus);
};

export const getBooking = async (bookingId) => {
  //particular booking
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }
  return booking;
};

export const cancelBooking = async (bookingId) => {
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }
  if (booking.bookingStatus === "Cancelled") {
    throw new Error("Booking is already cancelled.");
  }

  const updatedBooking = await updateBooking(bookingId, {
    bookingStatus: "Cancelled",
  });

  await updateAvailability(booking.car._id, true);

  await Trip.findOneAndUpdate(
    {
      booking: booking._id,
    },
    {
      status: "Cancelled",
      isSimulationRunning: false, //cancelling the trip
    },
  );

  return updatedBooking;
};

// export const confirmBooking = async (bookingId) => {
//   const booking = await findBookingById(bookingId);

//   if (!booking) {
//     throw new Error("Booking not found.");
//   }

//   if (booking.bookingStatus !== "Pending") {
//     throw new Error("Only pending bookings can be confirmed.");
//   }

// // Increase booking count
// booking.car.bookingCount += 1;
// await booking.car.save();

//   // Update booking status
//   const updatedBooking = await updateBooking(bookingId, {
//     bookingStatus: "Confirmed",
//   });

//   // Create Trip
//   const trip = await createTrip({
//     booking: updatedBooking._id,
//     customer: updatedBooking.customer,
//     owner: booking.car.owner,
//     car: updatedBooking.car._id,
//     pickupLocation: updatedBooking.pickupLocation,
//     dropLocation: updatedBooking.dropLocation,
//     route: [],
//     currentIndex: 0,
//     status: "Pending",
//   });
//   // Link Trip to Booking (only if you added trip field in Booking model)
//   updatedBooking.trip = trip._id;
//   await updatedBooking.save();

//   return updatedBooking;
// };

export const completeBooking = async (bookingId) => {
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (booking.bookingStatus !== "Confirmed") {
    throw new Error("Only confirmed bookings can be completed.");
  }
  await updateAvailability(booking.car._id, true);

  return await updateBooking(bookingId, { bookingStatus: "Completed" });
};

//edit booking details(dates,location)

export const editBooking = async (bookingId, updatedData) => {
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (booking.bookingStatus === "Cancelled") {
    throw new Error("Cancelled bookings cannot be updated.");
  }

  delete updatedData.customer;
  delete updatedData.car;
  delete updatedData.bookingStatus;
  delete updatedData.paymentStatus;
  delete updatedData.totalDays;
  delete updatedData.totalPrice;

  const pickupDate = new Date(updatedData.pickupDate || booking.pickupDate);

  const returnDate = new Date(updatedData.returnDate || booking.returnDate);

  if (returnDate <= pickupDate) {
    throw new Error("Return date must be after pickup date.");
  }

  const { totalDays, totalPrice } = calculatePrice(
    pickupDate,
    returnDate,
    booking.car.pricePerDay,
  );

  updatedData.totalDays = totalDays;
  updatedData.totalPrice = totalPrice;

  return await updateBooking(bookingId, updatedData);
};

export const fetchOwnerBookings = async (user) => {
  if (user.role !== "owner" && user.role !== "admin") {
    throw new Error("Only owners can access bookings.");
  }

  return await getOwnerBookings(user.id);
};

export const fetchOwnerRevenue = async (user) => {
  if (user.role !== "owner" && user.role !== "admin") {
    throw new Error("Only owners can access revenue.");
  }

  const bookings = await getOwnerRevenueBookings(user.id);

  const currentDate = new Date();

  const revenue = bookings
    .filter((booking) => {
      const date = new Date(booking.createdAt);

      return (
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
      );
    })
    .reduce((sum, booking) => sum + booking.totalPrice, 0);

  return revenue;
};
