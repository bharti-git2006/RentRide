import {
  getTripById,
  getRunningTrip,
  updateTrip,
  addLocation,
  updateCurrentIndex,
  getLatestLocation,
  getTripHistory,
} from "../repositories/tripRepository.js";

import { generateRoute } from "../utils/routeGenerator.js";


export const startTrip = async (tripId) => {
  const trip = await getTripById(tripId);

  if (!trip) {
    throw new Error("Trip not found.");
  }

  if (trip.status === "Completed") {
    throw new Error("Trip already completed.");
  }

  if (trip.isSimulationRunning) {
    return trip;
  }

  // Generate route only once
  if (!trip.route || trip.route.length === 0) {
    const route = await generateRoute(trip.pickupLocation, trip.dropLocation);

    trip.route = route;

    await trip.save();
  }

  trip.status = "Running";
  trip.currentIndex = 0;
  trip.startedAt = new Date();
  trip.isSimulationRunning = true;

  await trip.save();

  simulateTrip(trip._id);

  return trip;
};

// ======================================================
// GPS Simulation
// ======================================================

const simulateTrip = async (tripId) => {
  const interval = setInterval(async () => {
    const trip = await getRunningTrip(tripId);

    if (!trip) {
      clearInterval(interval);
      return;
    }

    if (trip.currentIndex >= trip.route.length) {
      trip.status = "Completed";
      trip.isSimulationRunning = false;
      trip.endedAt = new Date();

      await trip.save();

      clearInterval(interval);
      return;
    }

    const point = trip.route[trip.currentIndex];

    await addLocation({
      trip: trip._id,

      latitude: point.latitude,

      longitude: point.longitude,

      speed: point.speed,
    });

    await updateCurrentIndex(
      trip._id,

      trip.currentIndex + 1,
    );
  }, 100);
};

// ======================================================
// Live Location
// ======================================================

export const getLiveLocation = async (tripId) => {
  const trip = await getTripById(tripId);

  if (!trip) {
    throw new Error("Trip not found.");
  }

  const latestLocation = await getLatestLocation(tripId);

  // Trip hasn't started yet
  if (!latestLocation) {
    return {
      latitude: null,
      longitude: null,
      speed: 0,
      status: trip.status,
      currentIndex: trip.currentIndex,
      route: trip.route,
    };
  }

  return {
    latitude: latestLocation.latitude,

    longitude: latestLocation.longitude,

    speed: trip.status === "Completed" ? 0 : latestLocation.speed,

    status: trip.status,

    currentIndex: trip.currentIndex,
    route: trip.route,
  };
};

// ======================================================
// Trip History
// ======================================================

export const TripHistory = async (tripId) => {
  const history = await getTripHistory(tripId);

  return history;
};

// ======================================================
// Trip Stats
// ======================================================

export const getTripStats = async (tripId) => {
  const trip = await getTripById(tripId);

  if (!trip) {
    throw new Error("Trip not found.");
  }

  const history = await getTripHistory(tripId);

  let totalSpeed = 0;

  history.forEach((point) => {
    totalSpeed += point.speed || 0;
  });

  const averageSpeed =
    history.length > 0 ? Math.round(totalSpeed / history.length) : 0;

  const duration = history.length;

  const stops = history.filter((point) => point.speed === 0).length;

  return {
    distance: trip.totalDistance,
    averageSpeed,
    duration,
    stops,
  };
};

// ======================================================
// Complete Trip
// ======================================================

export const completeTrip = async (tripId) => {
  const trip = await getTripById(tripId);

  if (!trip) {
    throw new Error("Trip not found.");
  }

  trip.status = "Completed";
  trip.isSimulationRunning = false;
  trip.endedAt = new Date();

  await trip.save();

  return trip;
};
