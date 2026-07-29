import { Link } from "react-router-dom";
import { Users, Fuel, MapPin, Settings, ChevronRight, Star } from "lucide-react";

const CarCard = ({ car }) => {
  return (
    <Link
      to={`/cars/${car._id}`}
      className="group flex flex-col bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* 1. Image Section */}
      <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden bg-base-200">
        <img
          src={car.image?.[0] || "/api/placeholder/400/300"}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge badge-primary font-semibold shadow-sm border-none">
            {car.category}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title, Rating & Location */}
        <div className="mb-5">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h2 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-1">
              {car.brand} <span className="font-medium text-base-content/70">{car.model}</span>
            </h2>
            
            {/* Rating Badge */}
            <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-lg shrink-0">
              <Star size={14} className="fill-warning text-warning" />
              <span className="text-sm font-bold text-base-content">
                {car.rating ? car.rating : "New"}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-base-content/60">
            <MapPin size={15} className="text-error/80 shrink-0" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {/* 3. Specs Grid */}
        <div className="grid grid-cols-3 gap-2 mb-5 mt-auto">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-base-200/50 text-base-content/70">
            <Users size={18} className="mb-1 text-primary/80" />
            <span className="text-xs font-semibold">{car.seatingCapacity} Seats</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-base-200/50 text-base-content/70">
            <Settings size={18} className="mb-1 text-primary/80" />
            <span className="text-xs font-semibold line-clamp-1">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-base-200/50 text-base-content/70">
            <Fuel size={18} className="mb-1 text-primary/80" />
            <span className="text-xs font-semibold line-clamp-1">{car.fuel}</span>
          </div>
        </div>

        <hr className="border-base-200 mb-4" />

        {/* 4. Footer: Price & CTA */}
        <div className="flex justify-between items-end mt-auto">
          <div>
            <p className="text-xs text-base-content/50 font-medium mb-0.5 uppercase tracking-wider">Daily Rate</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-base-content">
                ₹{car.pricePerDay?.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-medium text-base-content/50">
                /day
              </span>
            </div>
          </div>

          <button className="btn btn-primary btn-sm h-10 px-4 rounded-lg shadow-sm group-hover:btn-active">
            Details
            <ChevronRight size={16} className="-mr-1 opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
      </div>
    </Link>
  );
};

export default CarCard;