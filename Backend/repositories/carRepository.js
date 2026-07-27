import Car from "../models/Car.js";

export const createCar = async (carData) => {

    return await Car.create(carData);

};


export const findCarById = async (carId) => {

    return await Car.findById(carId).populate("owner", "name email");

};


export const findCarByRegistrationNumber = async (registrationNumber) => {

    return await Car.findOne({
        registrationNumber
    });

};


export const getAllCars = async (filters) => {
    return await Car.find(filters)
        .populate("owner", "name email");
};


export const updateCar = async (
    carId,
    updatedData
) => {

    return await Car.findByIdAndUpdate(

        carId,

        updatedData,

        {
            new: true,
            runValidators: true
        }

    );

};


export const softDeleteCar = async (carId) => {

    return await Car.findByIdAndUpdate(

        carId,

        {
            isActive: false
        },

        {
            new: true,
            runValidators: true
        }

    );

};


export const updateAvailability = async (
    carId,
    isAvailable
) => {

    return await Car.findByIdAndUpdate(

        carId,

        {
            isAvailable
        },

        {
            new: true,
            runValidators: true
        }

    );

};

export const getPopularCars = async () => {
    return await Car.find({
        isActive: true
    }).sort({ bookingCount: -1}).limit(3).populate("owner", "name");

};

export const getRecommendedCars = async () => {

    return await Car.find({
        isActive: true
    }).sort({bookingCount: -1, pricePerDay: 1 }).limit(3).populate("owner", "name");};