import {
  createCar,
  findCarById,
  findCarByRegistrationNumber,
  getAllCars,
  updateCar,
  softDeleteCar,
  updateAvailability,
  getPopularCars,
  getRecommendedCars,
  getOwnerCars
} from "../repositories/carRepository.js";

export const addCar = async (carData, ownerId) => {
  if (user.role !== "admin" && user.role !== "owner") {
    throw new Error("You are not allowed to edit cars.");
  }
  const existingCar = await findCarByRegistrationNumber(
    carData.registrationNumber,
  );

  if (existingCar) {
    throw new Error("Car with this registration number already exists.");
  }

  if (carData.pricePerDay <= 0 || carData.mileage < 0) {
    throw new Error("No -ve fields allowed.");
  }

  carData.owner = ownerId;

  return await createCar(carData);
};

export const getCars = async (query) => {
  //for all users
  const filters = { isActive: true };

  if (query.brand) {
    filters.brand = {
      $regex: query.brand, //each letter will be give result
      $options: "i",
    };
  }

  if (query.model) {
    filters.model = {
      $regex: query.model,
      $options: "i",
    };
  }

  if (query.location) {
    filters.location = {
      $regex: query.location,
      $options: "i",
    };
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.fuelType) {
    filters.fuelType = query.fuelType;
  }

  if (query.transmission) {
    filters.transmission = query.transmission;
  }

  if (query.isAvailable) {
    filters.isAvailable = query.isAvailable === "true";
  }

  return await getAllCars(filters);
};

export const getCar = async (carId) => {
  const car = await findCarById(carId);

  if (!car || !car.isActive) {
    throw new Error("Car not found.");
  }

  return car;
};

export const editCar = async (carId, updatedData, user) => {
  delete updatedData.owner;
  delete updatedData.registrationNumber; //restriction on updation

  const car = await findCarById(carId);

  if (!car) {
    throw new Error("Car not found.");
  }

  // Only owner and admin can edit
  if (user.role !== "admin" && user.role !== "owner") {
    throw new Error("You are not allowed to edit cars.");
  }

  // Owner can edit only their own cars
  if (user.role === "owner" && car.owner.toString() !== user.id) {
    throw new Error("You can only edit your own cars.");
  }

  return await updateCar(carId, updatedData);
};

export const deleteCar = async (carId, user) => {
  const car = await findCarById(carId);
  if (!car) {
    throw new Error("Car not found.");

    if (user.role !== "admin" && user.role !== "owner") {
      throw new Error("You are not allowed to edit cars.");
    }
  }
  if (user.role === "owner" && car.owner.toString() !== user.id) {
    throw new Error("You can delete only your own cars.");
  }

  await softDeleteCar(carId);
};

export const changeAvailability = async (carId, isAvailable, user) => {
  const car = await findCarById(carId);

  if (!car) {
    throw new Error("Car not found.");
  }
  if (user.role !== "admin" && user.role !== "owner") {
    throw new Error("You are not allowed to edit cars.");
  }

  if (user.role === "owner" && car.owner.toString() !== user.id) {
    throw new Error("You can update only your own cars.");
  }

  return await updateAvailability(carId, isAvailable);
};

export const fetchPopularCars = async () => {
  return await getPopularCars();
};

export const fetchRecommendedCars = async () => {
  return await getRecommendedCars();
};

export const ownerCars = async (user) => {  //owner(admin,lender) access to to get cars
  if (user.role === "admin") {
    return await getAllCars({
      isActive: true,
    });
  }

  if (user.role === "owner") {
    return await getOwnerCars(user.id);
  }

  throw new Error("Access denied.");
};
