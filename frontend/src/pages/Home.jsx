import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import AiChatWidget from "../components/AiChatWidget";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data.data;
}

const heroPhotos = [
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
    rotate: "-rotate-6",
  },
  {
    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
    rotate: "rotate-3",
  },
  {
    src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80",
    rotate: "-rotate-3",
  },
  {
    src: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=600&q=80",
    rotate: "rotate-6",
  },
  {
    src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80",
    rotate: "-rotate-4",
  },
  {
    src: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=600&q=80",
    rotate: "rotate-4",
  },
];

const scrollingPhotos = [...heroPhotos, ...heroPhotos];

const marqueeMessage = "Great Escape Sale — 15% off with code ESCAPE15";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await get("/cars/popular");
        setCars(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/cars?location=${location}`);
  };

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Moving offer bar */}
      <div className="overflow-hidden bg-primary text-primary-content shadow-sm">
        <div className="flex w-max animate-marquee py-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 flex items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide"
            >
              <span aria-hidden="true">🔑</span>
              {marqueeMessage}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-base-200/50 to-base-100 pb-10">
        <div className="mx-auto max-w-6xl px-6 pt-16 text-center lg:pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm font-medium text-base-content/80 shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
            </span>
            1000+ Cars Available Nationwide
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-6xl lg:text-7xl">
            Your Next Road Trip <br className="hidden sm:block" />
            <span className="text-primary">Starts Here</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-base-content/60 sm:text-xl">
            Self-drive cars in cities across India. Skip the paperwork and the
            lines—pick a location, choose your ride, and go.
          </p>
        </div>

        {/* Angled, overlapping photo strip */}
        <div className="relative mt-12 overflow-hidden py-8">
          <div className="flex w-max animate-scroll-photos items-center gap-0">
            {scrollingPhotos.map((photo, i) => (
              <div
                key={i}
                className={`-ml-10 shrink-0 rounded-2xl border-[6px] border-base-100 bg-base-100 shadow-xl transition-transform hover:scale-105 hover:z-50 ${photo.rotate} first:ml-0`}
                style={{ zIndex: scrollingPhotos.length - i }}
              >
                <img
                  src={photo.src}
                  alt="Car driving view"
                  className="h-44 w-64 rounded-xl object-cover sm:h-56 sm:w-80"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base-100 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base-100 to-transparent z-10" />

          {/* Floating Search Bar */}
          <div className="relative z-20 mx-auto -mt-10 w-[92%] max-w-3xl rounded-2xl border border-base-300 bg-base-100/90 p-3 shadow-2xl backdrop-blur-md sm:-mt-1 sm:p-4">
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label className="flex flex-1 items-center gap-3 rounded-xl border border-base-200 bg-base-200/50 px-5 py-3.5 transition-colors focus-within:border-primary focus-within:bg-base-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21c-4.5-4.2-7-7.7-7-11a7 7 0 1 1 14 0c0 3.3-2.5 6.8-7 11Z"
                  />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <input
                  type="text"
                  placeholder="Where do you want to drive from?"
                  className="w-full bg-transparent text-base text-base-content outline-none placeholder:text-base-content/40"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </label>

              <button
                type="submit"
                className="btn btn-primary h-auto rounded-xl px-8 text-base sm:w-48"
              >
                Find a Car
              </button>
            </form>
          </div>
        </div>
      </div>

      {/*How it Works Section */}
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-base-content sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-base-content/60">
            Hit the road in three simple steps.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-base-content">
              1. Find Your Car
            </h3>
            <p className="mt-2 text-base-content/70 text-sm leading-relaxed">
              Enter your location and dates to browse a wide selection of
              well-maintained vehicles.
            </p>
          </div>

      
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-base-content">
              2. Book & Unlock
            </h3>
            <p className="mt-2 text-base-content/70 text-sm leading-relaxed">
              Complete your booking online and use our app to seamlessly unlock
              your car on the day.
            </p>
          </div>

        
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-base-content">
              3. Hit the Road
            </h3>
            <p className="mt-2 text-base-content/70 text-sm leading-relaxed">
              Enjoy your trip with zero hidden fees. Return the car to the
              designated spot when you're done.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Cars Section */}
      <div className="bg-base-200/50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold text-base-content sm:text-4xl">
                Trending Rides
              </h2>
              <p className="mt-2 text-base-content/60">
                Our most popular vehicles booked this week.
              </p>
            </div>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => navigate("/cars")}
            >
              View All Cars
            </button>
          </div>

          {cars.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-100">
              <p className="text-base-content/60 font-medium">
                No cars available right now. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AiChatWidget />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        @keyframes scroll-photos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-photos {
          animation: scroll-photos 35s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee,
          .animate-scroll-photos {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
