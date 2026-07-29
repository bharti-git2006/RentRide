import {
  bookCar,
  getBookingHistory,
  getBooking,
  editBooking,
  cancelBooking,
  completeBooking,
  fetchOwnerBookings,
  fetchOwnerRevenue
} from "../services/bookingService.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await bookCar(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await getBookingHistory(
      req.user.id,
      req.query.bookingStatus,
    );

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await getBooking(req.params.id);

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await editBooking(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeBooking = async (req, res) => {
  try {
    const booking = await cancelBooking(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// export const confirmBookingStatus = async (req, res) => {
//   try {
//     const booking = await confirmBooking(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Booking confirmed successfully.",
//       data: booking,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const completedBookingStatus = async (req, res) => {
  try {
    const booking = await completeBooking(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking Completed successfully, Car Returned.",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const OwnerBookings = async (req, res) => {
  try {
    const bookings = await fetchOwnerBookings(req.user);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export const ownerRevenue = async (req, res) => {
  try {
    const revenue = await fetchOwnerRevenue(req.user);

    res.status(200).json({
      success: true,
      revenue,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};