const calculatePrice = (
    pickupDate,
    returnDate,
    pricePerDay
) => {

    const totalDays = Math.ceil(

        (returnDate - pickupDate) /

        (1000 * 60 * 60 * 24)

    );

    if (totalDays <= 0) {

        throw new Error(
            "Invalid booking dates."
        );

    }

    return {

        totalDays,

        totalPrice: totalDays * pricePerDay

    };

};

export default calculatePrice;