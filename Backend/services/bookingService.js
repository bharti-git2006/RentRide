import {
    createBooking,
    findBookingById,
    findUserBookings,
    updateBooking,
    findActiveBooking
} from "../repositories/bookingRepository.js";

import {
    findCarById,
    updateAvailability
} from "../repositories/carRepository.js";

import calculatePrice from "../utils/calculatePrice.js";



export const bookCar = async (
    bookingData,
    customerId
) => {

    const car = await findCarById(
        bookingData.car
    );

    if (!car || !car.isActive) {

        throw new Error(
            "Car not found."
        );

    }

    if (!car.isAvailable) {

        throw new Error(
            "This car is currently unavailable."
        );

    }

    const activeBooking =
        await findActiveBooking(
            bookingData.car
        );

    if (activeBooking) {

        throw new Error(
            "This car has already been booked."
        );

    }

    const pickupDate = new Date(
        bookingData.pickupDate
    );

    const returnDate = new Date(
        bookingData.returnDate
    );

    if (returnDate <= pickupDate) {

        throw new Error(
            "Return date must be after pickup date."
        );

    }

    const {totalDays , totalPrice} = calculatePrice( pickupDate, returnDate, car.pricePerDay);

    bookingData.customer = customerId;
    bookingData.totalDays = totalDays;
    bookingData.totalPrice = totalPrice;

    const booking = await createBooking(bookingData);


    await updateAvailability(
        bookingData.car,
        false
    );


    return booking;

};



export const getBookingHistory = async ( customerId,bookingStatus) => {   //get all booking history of a user
    return await findUserBookings(
        customerId,
        bookingStatus
    );
};



export const getBooking = async ( bookingId) => {  //particular booking
    const booking =
        await findBookingById(
            bookingId
        );

    if (!booking) {

        throw new Error(
            "Booking not found."
        );
    }
    return booking;

};

export const cancelBooking = async (
    bookingId
) => {

    const booking =
        await findBookingById(
            bookingId
        );

    if (!booking) {

        throw new Error(
            "Booking not found."
        );

    }
    if (booking.bookingStatus === "Cancelled") {
        throw new Error(
            "Booking is already cancelled."
        );
    }

    const updatedBooking =
        await updateBooking(
            bookingId,
            {
                bookingStatus: "Cancelled"
            }
        );

    await updateAvailability(
        booking.car._id,
        true
    );

    return updatedBooking;

};

export const confirmBooking = async (
    bookingId
) => {
    const booking =
        await findBookingById(
            bookingId
        );

    if (!booking) {

        throw new Error(
            "Booking not found."
        );

    }

    booking.car.bookingCount += 1; //increasing the booking count for car
    await booking.car.save();

    return await updateBooking(
        bookingId,
        {
            bookingStatus: "Confirmed"
        }
    );

};

export const completeBooking = async (
    bookingId
) => {

    const booking =
        await findBookingById(
            bookingId
        );

    if (!booking) {

        throw new Error(
            "Booking not found."
        );

    }

    if (booking.bookingStatus !== "Confirmed") {

        throw new Error(
            "Only confirmed bookings can be completed."
        );

    }
    await updateAvailability( booking.car._id,true );

    return await updateBooking(bookingId,{ bookingStatus: "Completed" } );
};

//edit booking details(dates,location)

export const editBooking = async (
    bookingId,
    updatedData
) => {

    const booking = await findBookingById(
        bookingId
    );

    if (!booking) {

        throw new Error(
            "Booking not found."
        );

    }

    if (booking.bookingStatus === "Cancelled") {

        throw new Error(
            "Cancelled bookings cannot be updated."
        );

    }

    delete updatedData.customer;
    delete updatedData.car;
    delete updatedData.bookingStatus;
    delete updatedData.paymentStatus;
    delete updatedData.totalDays;
    delete updatedData.totalPrice;

    const pickupDate = new Date(
        updatedData.pickupDate || booking.pickupDate
    );

    const returnDate = new Date(
        updatedData.returnDate || booking.returnDate
    );

    if (returnDate <= pickupDate) {

        throw new Error(
            "Return date must be after pickup date."
        );

    }

    const {
        totalDays,
        totalPrice
    } = calculatePrice(
        pickupDate,
        returnDate,
        booking.car.pricePerDay
    );

    updatedData.totalDays = totalDays;
    updatedData.totalPrice = totalPrice;

    return await updateBooking(
        bookingId,
        updatedData
    );

};