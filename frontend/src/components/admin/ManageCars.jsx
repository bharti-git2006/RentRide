
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ManageCars = () => {
  const [pendingCars, setPendingCars] = useState([]);
  const [existingCars, setExistingCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useAuthStore((state) => state.user?.token);

  const fetchPendingCars = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cars/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setPendingCars(data.data || []);
    } catch (error) {
      console.error("Error fetching pending cars:", error);
    }
  };


  const fetchExistingCars = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cars`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const cars = data.data || data || [];

      // Remove pending requests from existing cars
      setExistingCars(
        cars.filter((car) => car.approvalStatus !== "Pending")
      );

    } catch (error) {
      console.error("Error fetching existing cars:", error);
    }
  };


  const fetchCars = async () => {
    setLoading(true);

    await Promise.all([
      fetchPendingCars(),
      fetchExistingCars(),
    ]);

    setLoading(false);
  };


  useEffect(() => {
    fetchCars();
  }, [token]);


  const reviewCar = async (
    carId,
    approvalStatus,
    rejectionReason = ""
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/cars/${carId}/review`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            approvalStatus,
            rejectionReason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      fetchCars();

    } catch (error) {
      console.error(error);
    }
  };


  const handleReject = (carId) => {
    const reason = prompt("Enter rejection reason:");

    if (!reason) return;

    reviewCar(carId, "Rejected", reason);
  };


  if (loading) {
    return (
      <div className="loading loading-spinner loading-lg text-primary"></div>
    );
  }


  return (
    <div className="space-y-10">

      {/* Pending Requests */}
      <section>

        <h1 className="text-3xl font-black mb-6">
          Pending Car Requests
        </h1>


        {pendingCars.length === 0 ? (
          <p>No pending requests.</p>
        ) : (

          <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box">

            <table className="table w-full">

              <thead>
                <tr className="bg-base-200">
                  <th>Car</th>
                  <th>Owner</th>
                  <th>Category</th>
                  <th>Price/Day</th>
                  <th>Actions</th>
                </tr>
              </thead>


              <tbody>

                {pendingCars.map((car) => (

                  <tr key={car._id}>

                    <td className="font-semibold">
                      {car.brand} {car.model}
                    </td>


                    <td>
                      {car.owner?.name}
                      <br />
                      <span className="text-sm">
                        {car.owner?.email}
                      </span>
                    </td>


                    <td>
                      {car.category}
                    </td>


                    <td>
                      ₹{car.pricePerDay}
                    </td>


                    <td className="space-x-2">

                      <button
                        className="btn btn-sm btn-outline btn-success"
                        onClick={() =>
                          reviewCar(car._id, "Approved")
                        }
                      >
                        Approve
                      </button>


                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() =>
                          handleReject(car._id)
                        }
                      >
                        Reject
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>



      {/* Existing Cars */}

      <section>

        <h1 className="text-3xl font-black mb-6">
          Existing Cars
        </h1>


        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box">

          <table className="table w-full">

            <thead>
              <tr className="bg-base-200">
                <th>Brand & Model</th>
                <th>Category</th>
                <th>Price/Day</th>
                <th>Status</th>
              </tr>
            </thead>


            <tbody>

              {existingCars.map((car) => (

                <tr key={car._id}>

                  <td className="font-semibold">
                    {car.brand} {car.model}
                  </td>


                  <td>
                    {car.category}
                  </td>


                  <td>
                    ₹{car.pricePerDay}
                  </td>


                  <td>

                    <span className="badge badge-success">
                      Approved
                    </span>

                  </td>


                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>


    </div>
  );
};


export default ManageCars;