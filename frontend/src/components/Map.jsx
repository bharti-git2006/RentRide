import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// car icon
const carIcon = L.divIcon({
  className: 'custom-car-marker',
  html: `<div style="font-size: 20px; filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.6));">🚗</div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10]
});

// Dictionary covering all 10 locations
const cityCoordinates = {
  "New Delhi": [28.6139, 77.2090],
  "Mumbai": [19.0760, 72.8777],
  "Bengaluru": [12.9716, 77.5946],
  "Chennai": [13.0827, 80.2707],
  "Hyderabad": [17.3850, 78.4867],
  "Pune": [18.5204, 73.8567],
  "Kolkata": [22.5726, 88.3639],
  "Jaipur": [26.9124, 75.7873],
  "Ahmedabad": [23.0225, 72.5714],
  "Goa": [15.2993, 74.1240]
};

// Jitter helper function
const applyJitter = (coord, index) => {
  const jitterAmount = 0.08; 
  return coord + (Math.sin(index * 100) * jitterAmount);
};

// Helper function to calculate initial positions
const getInitialPositions = (carList) => {
  return carList.map((car, index) => {
    const base = cityCoordinates[car.location];
    if (!base) return null;
    return [
      applyJitter(base[0], index + 1),
      applyJitter(base[1], index + 2)
    ];
  });
};

export default function Map({ cars }) {
  const defaultCenter = [22.5937, 78.9629]; 
  const defaultZoom = 5;

  const carList = Array.isArray(cars) ? cars : [];

  // Track previous cars prop to detect changes during render
  const [prevCars, setPrevCars] = useState(cars);
  const [livePositions, setLivePositions] = useState(() => getInitialPositions(carList));

  if (prevCars !== cars) {
    setPrevCars(cars);
    setLivePositions(getInitialPositions(carList));
  }

  // Movement simulation loop
  useEffect(() => {
    if (livePositions.length === 0) return;

    const drivingInterval = setInterval(() => {
      setLivePositions((currentPositions) => 
        currentPositions.map((pos, i) => {
          if (!pos) return null;
          
          const time = Date.now() / 1000;
          const driveLat = Math.sin(time + i) * 0.0001; 
          const driveLng = Math.cos(time + i) * 0.0001; 

          return [pos[0] + driveLat, pos[1] + driveLng];
        })
      );
    }, 200); 

    return () => clearInterval(drivingInterval);
  }, [livePositions.length]);

  return (
    <div style={{ padding: '10px 0', zIndex: 0 }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: '500px', width: '100%', borderRadius: '12px', zIndex: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        />

        {carList.map((car, index) => {
          const position = livePositions[index];
          if (!position) return null;

          return (
            <Marker key={car._id || car.registrationNumber || index} position={position} icon={carIcon}>
              <Popup className="custom-popup" minWidth={200}>
                <div className="flex flex-col gap-2 p-1">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold leading-tight m-0">{car.brand} {car.model}</h3>
                    <p className="text-sm text-gray-500 m-0">{car.category} • {car.transmission}</p>
                    <p className="text-xs text-gray-400 m-0">{car.location}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-lg font-bold text-blue-600">${car.pricePerDay}<span className="text-sm text-gray-500 font-normal">/day</span></span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
