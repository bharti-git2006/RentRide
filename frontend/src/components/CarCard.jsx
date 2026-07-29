import { Link } from "react-router-dom";
import { Users, Fuel, MapPin, Settings } from "lucide-react";

const CarCard = ({ car }) => {
  return (
    <Link
      to={`/cars/${car._id}`}
      className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <figure className="relative">
        <img
          src={car.image?.[0]}
          alt={`${car.brand} ${car.model}`}
          className="h-56 w-full object-cover"
        />

        <div className="badge badge-primary absolute top-4 left-4">
          {car.category}
        </div>
      </figure>

      <div className="card-body">

        <h2 className="card-title justify-between">
          {car.brand} {car.model}
        </h2>

        <div className="flex flex-wrap gap-4 text-sm text-base-content/70">

          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{car.seatingCapacity} Seats</span>
          </div>

          <div className="flex items-center gap-1">
            <Fuel size={16} />
            <span>{car.fuel}</span>
          </div>

          <div className="flex items-center gap-1">
            <Settings size={16} />
            <span>{car.transmission}</span>
          </div>

        </div>

        <div className="flex items-center gap-2 text-sm text-base-content/60">
          <MapPin size={16} />
          <span>{car.location}</span>
        </div>

        <div className="card-actions justify-between items-center mt-4">

          <div>
            <span className="text-2xl font-bold text-primary">
              ₹{car.pricePerDay}
            </span>
            <span className="text-sm text-base-content/60">
              {" "}
              / day
            </span>
          </div>

          <button className="btn btn-primary">
            View Details
          </button>

        </div>

      </div>
    </Link>
  );
};

export default CarCard;