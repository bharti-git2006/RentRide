import Trip from "../models/Trip.js";
import LocationHistory from "../models/LocationHistory.js";

export const createTrip = async (tripData) => {
    return await Trip.create(tripData);
};

export const getTripById = async (tripId) => {
    return await Trip.findById(tripId)
        .populate("booking")
        .populate("car")
        .populate("customer", "name email")
        .populate("owner", "name email");
};

export const updateTrip = async (tripId, updatedData) => {
    return await Trip.findByIdAndUpdate(
        tripId,
        updatedData,
        { new: true }
    );
};

// Location History


export const addLocation = async (locationData) => {
    return await LocationHistory.create(locationData);
};

export const getLatestLocation = async (tripId) => {
    return await LocationHistory.findOne({
        trip: tripId
    }).sort({ timestamp: -1 });
};

export const getTripHistory = async (tripId) => {
    return await LocationHistory.find({
        trip: tripId
    }).sort({ timestamp: 1 });
};

export const clearTripHistory = async (tripId) => {
    return await LocationHistory.deleteMany({
        trip: tripId
    });
};

// Get running trip
export const getRunningTrip = async (tripId) => {

    return await Trip.findOne({
        _id: tripId,
        isSimulationRunning: true
    });

};

// Save current GPS index
export const updateCurrentIndex = async (tripId, index) => {

    return await Trip.findByIdAndUpdate(
        tripId,
        {
            currentIndex: index
        },
        {
            new: true
        }
    );

};