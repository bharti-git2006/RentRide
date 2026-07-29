import {
  addCar,
  getCars,
  getCar,
  editCar,
  deleteCar,
  changeAvailability,
  fetchPopularCars,
  fetchRecommendedCars,
  ownerCars
} from "../services/carService.js";


// CREATE CAR
export const createCar = async (req, res) => {
  try {

    const carData = req.body;

    const ownerId = req.user.id;

    const car = await addCar(
      carData,
      ownerId
    );

    res.status(201).json({
      success: true,
      message: "Car added successfully",
      car
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// GET ALL CARS
export const getAllCars = async (req, res) => {
  try {

    const cars = await getCars(req.query);

    res.status(200).json({
      success: true,
      cars
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// GET SINGLE CAR
export const getCarById = async (req, res) => {
  try {

    const carId = req.params.id;

    const car = await getCar(carId);

    res.status(200).json({
      success: true,
      car
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }
};


// UPDATE CAR
export const updateCar = async (req, res) => {
  try {

    const carId = req.params.id;

    const updatedData = req.body;

    const user = req.user;


    const car = await editCar(
      carId,
      updatedData,
      user
    );


    res.status(200).json({
      success: true,
      message: "Car updated successfully",
      car
    });


  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// DELETE CAR
export const removeCar = async (req, res) => {
  try {

    const carId = req.params.id;

    const user = req.user;


    await deleteCar(
      carId,
      user
    );


    res.status(200).json({
      success: true,
      message: "Car deleted successfully"
    });


  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// UPDATE AVAILABILITY
export const updateAvailabilityStatus = async (req, res) => {
  try {

    const carId = req.params.id;

    const { isAvailable } = req.body;

    const user = req.user;


    const car = await changeAvailability(
      carId,
      isAvailable,
      user
    );


    res.status(200).json({
      success: true,
      message: "Availability updated",
      car
    });


  } catch(error){

    res.status(400).json({
      success:false,
      message:error.message
    });

  }
};



// POPULAR CARS
export const popularCars = async (req,res)=>{
  try{

    const cars = await fetchPopularCars();

    res.status(200).json({
      success:true,
      cars
    });

  }catch(error){

    res.status(400).json({
      success:false,
      message:error.message
    });

  }
};



// RECOMMENDED CARS
export const recommendedCars = async(req,res)=>{
  try{

    const cars = await fetchRecommendedCars();

    res.status(200).json({
      success:true,
      cars
    });

  }catch(error){

    res.status(400).json({
      success:false,
      message:error.message
    });

  }
};



// OWNER / ADMIN CAR DASHBOARD
export const getOwnerCars = async(req,res)=>{
  try{

    const user = req.user;


    const cars = await ownerCars(user);


    res.status(200).json({
      success:true,
      cars
    });


  }catch(error){

    res.status(403).json({
      success:false,
      message:error.message
    });

  }
};