import { locationCoordinates } from "./locationCoordinates.js";

export const generateRoute = async (pickupLocation, dropLocation) => {
  const pickup = locationCoordinates[pickupLocation];
  const drop = locationCoordinates[dropLocation];

  if (!pickup || !drop) {
    throw new Error("Invalid pickup or drop location.");
  }

  console.log("Pickup Location:-", pickupLocation);
  console.log("Coordinates:", pickup);
  console.log("Drop Location:", dropLocation);
  console.log("Coordinates:", drop);

  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}` +
    `?overview=full&geometries=geojson`;

  console.log(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch route from OSRM.");
  }

  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    throw new Error("No route found.");
  }

  const coordinates = data.routes[0].geometry.coordinates;

  // Number of extra points between every two coordinates
  const DENSITY = 6;
  // 4 => approximately 5x more points

  const smoothRoute = [];

  for (let i = 0; i < coordinates.length - 1; i++) {
    const [lng1, lat1] = coordinates[i];
    const [lng2, lat2] = coordinates[i + 1];

    smoothRoute.push({
      latitude: lat1,
      longitude: lng1,
      speed: Math.floor(Math.random() * 15) + 40
    });

    for (let j = 1; j <= DENSITY; j++) {
      const t = j / (DENSITY + 1);

      smoothRoute.push({
        latitude: lat1 + (lat2 - lat1) * t,
        longitude: lng1 + (lng2 - lng1) * t,
        speed: Math.floor(Math.random() * 15) + 40
      });
    }
  }

  // Add final destination
  const [lastLng, lastLat] = coordinates[coordinates.length - 1];

  smoothRoute.push({
    latitude: lastLat,
    longitude: lastLng,
    speed: 0,
  });

  return smoothRoute;

  // const coordinates = data.routes[0].geometry.coordinates;

  // // Number of points you want  to decide the no of points covered on the route
  // const MAX_POINTS = 150;

  // // If route already has <=150 points, use it as is
  // let sampledCoordinates = coordinates;

  // if (coordinates.length > MAX_POINTS) {

  //     sampledCoordinates = [];

  //     const step = (coordinates.length - 1) / (MAX_POINTS - 1);

  //     for (let i = 0; i < MAX_POINTS; i++) {
  //         sampledCoordinates.push(
  //             coordinates[Math.round(i * step)]
  //         );
  //     }
  // }

  // return sampledCoordinates.map(([longitude, latitude]) => ({
  //     latitude,
  //     longitude,
  //     speed: Math.floor(Math.random() * 25) + 35
  // }));
};
