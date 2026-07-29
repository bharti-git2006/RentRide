import {
  startTrip,
  getLiveLocation,
  TripHistory,
  getTripStats,
  completeTrip,
} from "../services/tripService.js";

// ======================================================
// Start Trip
// POST /api/trips/start/:tripId
// ======================================================

export const startTripController = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const trip = await startTrip(bookingId);
    res.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// Live Location
// GET /api/trips/live/:tripId
// ======================================================

export const getLiveLocationController = async (req, res) => {
  try {
    const { tripId } = req.params;

    const location = await getLiveLocation(tripId);

    return res.status(200).json({
      success: true,

      data: location,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// Trip History
// GET /api/trips/history/:tripId
// ======================================================

export const getTripHistoryController = async (req, res) => {
  try {
    const { tripId } = req.params;

    const history = await TripHistory(tripId);

    return res.status(200).json({
      success: true,

      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// Trip Stats
// GET /api/trips/stats/:tripId
// ======================================================

export const getTripStatsController = async (req, res) => {
  try {
    const { tripId } = req.params;

    const stats = await getTripStats(tripId);

    return res.status(200).json({
      success: true,

      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// Complete Trip
// POST /api/trips/complete/:tripId
// ======================================================

export const completeTripController = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await completeTrip(tripId);

    return res.status(200).json({
      success: true,
      message: "Trip completed successfully.",
      data: trip,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
