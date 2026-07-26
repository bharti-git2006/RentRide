import { createCar, findCarById, findCarByRegistrationNumber, getAllCars, updateCar, softDeleteCar, updateAvailability, getPopularCars, getRecommendedCars
} from "../repositories/carRepository.js";


export const addCar = async (
    carData,
    ownerId
) => {

    const existingCar =
        await findCarByRegistrationNumber(
            carData.registrationNumber
        );

    if (existingCar) {

        throw new Error(
            "Car with this registration number already exists."
        );

    }

    if (carData.pricePerDay <= 0||carData.mileage < 0) {

    throw new Error(
        "No -ve fields allowed."
    );

    }

    carData.owner = ownerId;

    return await createCar(
        carData
    );

};



export const getCars = async ( query ) => {

    const filters = { isActive: true};

    if (query.brand) {
        filters.brand = {
            $regex: query.brand, //each letter will be give result
            $options: "i"
        };

    }

    if (query.model) {

        filters.model = {
            $regex: query.model,
            $options: "i"
        };

    }

    if (query.location) {

        filters.location = {
            $regex: query.location,
            $options: "i"
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

        filters.isAvailable =query.isAvailable ==="true";

    }

    return await getAllCars(
        filters
)

};



export const getCar = async (
    carId
) => {

    const car =
        await findCarById(
            carId
        );

    if (!car || !car.isActive) {

        throw new Error(
            "Car not found."
        );

    }

    return car;

};



export const editCar = async (
    carId,
    updatedData
) => {

    delete updatedData.owner;
    delete updatedData.registrationNumber; //restriction on updation

    const updatedCar =
        await updateCar(
            carId,
            updatedData
        );

    if (!updatedCar) {

        throw new Error(
            "Car not found."
        );

    }

    return updatedCar;

};



export const deleteCar = async (
    carId
) => {

    const deletedCar =
        await softDeleteCar(
            carId
        );

    if (!deletedCar) {

        throw new Error(
            "Car not found."
        );

    }

};



export const changeAvailability = async (
    carId,
    isAvailable
) => {

    const updatedCar =
        await updateAvailability(
            carId,
            isAvailable
        );

    if (!updatedCar) {

        throw new Error(
            "Car not found."
        );

    }

    return updatedCar;

};

export const fetchPopularCars = async () => {

    return await getPopularCars();

};

export const fetchRecommendedCars = async () => {

    return await getRecommendedCars();

};