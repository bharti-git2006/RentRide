import { addCar, getCars, getCar, editCar, deleteCar, changeAvailability, fetchPopularCars,fetchRecommendedCars} from "../services/carService.js";


export const createCar = async (req, res) => {

    try {

        const carData = req.body;

        if (req.files && req.files.length > 0) {

            carData.image = req.files.map(
                (file) => file.path
            );

        }

        const newCar = await addCar(
            carData,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Car added successfully.",
            data: newCar
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};



export const getAllCars = async (req, res) => {

    try {

        const cars = await getCars(
            req.query
        );

        res.status(200).json({
            success: true,
            data: cars
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



export const getCarById = async (req, res) => {

    try {

        const car = await getCar(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: car
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};



export const updateCar = async (req, res) => {

    try {

        const updatedData = req.body;

        if (req.files && req.files.length > 0) {

            updatedData.image = req.files.map(
                (file) => file.path
            );

        }

        const updatedCar = await editCar(
            req.params.id,
            updatedData
        );

        res.status(200).json({
            success: true,
            message: "Car updated successfully.",
            data: updatedCar
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};



export const removeCar = async (req, res) => {

    try {

        await deleteCar(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Car deleted successfully."
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};



export const updateAvailabilityStatus = async (req, res) => {

    try {

        const { isAvailable } = req.body;

        const updatedCar =
            await changeAvailability(
                req.params.id,
                isAvailable
            );

        res.status(200).json({
            success: true,
            message: "Availability updated successfully.",
            data: updatedCar
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const popularCars = async (req, res) => {

    try {

        const cars =
            await fetchPopularCars();

        res.status(200).json({
            success: true,
            data: cars
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};



export const recommendedCars = async (req, res) => {

    try {

        const cars =
            await fetchRecommendedCars();

        res.status(200).json({
            success: true,
            data: cars
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};