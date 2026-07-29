export const calculatePrice = (pickupDate, returnDate, pricePerDay, coupon) => {
  const totalDays = Math.ceil(
    (returnDate - pickupDate) / (1000 * 60 * 60 * 24),
  );

  if (totalDays <= 0) {
    throw new Error("Invalid booking dates.");
  }

  const basePrice = totalDays * pricePerDay;

  if (coupon) {
    return {
      totalDays,
      totalPrice: (basePrice * 0.7) + 15, // 30% discount + service charge
    };
  }

  return {
    totalDays,
    totalPrice: basePrice + 15, // Normal price + service charge
  };
};

export default calculatePrice;
