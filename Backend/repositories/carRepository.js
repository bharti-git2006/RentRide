import Car from "../models/Car.js";

export const createCar = async (carData) => {
  return await Car.create(carData);
};

export const findCarById = async (carId) => {
  return await Car.findById(carId).populate("owner", "name email");
};

export const findCarByRegistrationNumber = async (registrationNumber) => {
  return await Car.findOne({ registrationNumber });
};

export const getAllCars = async (filters) => {
  return await Car.find(filters).populate("owner", "name email");
};

export const updateCar = async (carId, updatedData) => {
  return await Car.findByIdAndUpdate(
    carId,

    updatedData,

    {
      new: true,
      runValidators: true,
    },
  );
};

export const softDeleteCar = async (carId) => {
  return await Car.findByIdAndUpdate(
    carId,
    {
      isActive: false,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const updateAvailability = async (carId, isAvailable) => {
  return await Car.findByIdAndUpdate(
    carId,

    {
      isAvailable,
    },

    {
      new: true,
      runValidators: true,
    },
  );
};

export const getPopularCars = async () => {
  return await Car.find({
    isActive: true,
    approvalStatus: "Approved",
  })
    .sort({ bookingCount: -1 })
    .limit(6)
    .populate("owner", "name");
};

export const getRecommendedCars = async () => {
  return await Car.find({
    isActive: true,
    approvalStatus: "Approved",
  })
    .sort({ rating: -1, bookingCount: -1 })
    .limit(6)
    .populate("owner", "name");
};

export const getOwnerCars = async (ownerId) => {
  return await Car.find({
    owner: ownerId,
    isActive: true,
  });
};

export const getPendingCars = async () => {
  return await Car.find({
    approvalStatus: "Pending",
  }).populate("owner", "name email");
};

export const updateCarApproval = async (
  carId,
  approvalStatus,
  rejectionReason = "",
) => {
  return await Car.findByIdAndUpdate(
    carId,
    {
      approvalStatus,
      rejectionReason,
      isActive: approvalStatus === "Approved",
    },
    {
      new: true,
      runValidators: true,
    },
  );
};
