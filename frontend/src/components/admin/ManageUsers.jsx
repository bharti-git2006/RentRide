// import { useState, useEffect } from 'react';
// import { useAuthStore } from '../../store/useAuthStore';

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = useAuthStore((state) => state.user?.token);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/admin/all-users`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.success) setUsers(data.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, [token]);

//   if (loading) return <div className="loading loading-spinner loading-lg text-primary"></div>;

//   return (
//     <div>
//       <h1 className="text-3xl font-black mb-6">Manage Users</h1>
//       <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box">
//         <table className="table w-full">
//           <thead>
//             <tr className="bg-base-200">
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user._id}>
//                 <td className="font-semibold">{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="space-x-2">
//                   <button className="btn btn-sm btn-outline btn-info">Edit</button>
//                   <button className="btn btn-sm btn-outline btn-error">Ban</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ManageUsers = () => {
  const [pendingOwners, setPendingOwners] = useState([]);
  const [owners, setOwners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useAuthStore((state) => state.user?.token);


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const users = data.data || [];

      setOwners(
        users.filter(
          (user) =>
            user.role === "owner" &&
            user.ownerStatus === "approved"
        )
      );


      setCustomers(
        users.filter(
          (user) => user.role === "customer"
        )
      );


    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const fetchPendingOwners = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/admin/owner-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setPendingOwners(data.data || []);

    } catch (error) {
      console.error(
        "Error fetching owner requests:",
        error
      );
    }
  };


  const loadData = async () => {
    setLoading(true);

    await Promise.all([
      fetchUsers(),
      fetchPendingOwners(),
    ]);

    setLoading(false);
  };


  useEffect(() => {
    loadData();
  }, [token]);



  const approveOwner = async (id) => {

    try {

      await fetch(
        `${BASE_URL}/admin/owner-requests/${id}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadData();

    } catch (error) {
      console.error(error);
    }

  };



  const rejectOwner = async (id) => {

    try {

      await fetch(
        `${BASE_URL}/admin/owner-requests/${id}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      loadData();

    } catch (error) {
      console.error(error);
    }

  };



  if (loading)
    return (
      <div className="loading loading-spinner loading-lg text-primary"></div>
    );



  return (

    <div className="space-y-10">


      {/* Pending Owners */}

      <section>

        <h1 className="text-3xl font-black mb-6">
          Pending Owner Requests
        </h1>


        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box">

          <table className="table w-full">

            <thead>
              <tr className="bg-base-200">
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {pendingOwners.map((user) => (

                <tr key={user._id}>

                  <td className="font-semibold">
                    {user.name}
                  </td>


                  <td>
                    {user.email}
                  </td>


                  <td className="space-x-2">

                    <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() =>
                        approveOwner(user._id)
                      }
                    >
                      Approve
                    </button>


                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() =>
                        rejectOwner(user._id)
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

      </section>





      {/* Approved Owners */}

      <section>

        <h1 className="text-3xl font-black mb-6">
          Approved Owners
        </h1>


        <UserTable users={owners} />

      </section>





      {/* Customers */}

      <section>

        <h1 className="text-3xl font-black mb-6">
          Customers
        </h1>


        <UserTable users={customers} />

      </section>



    </div>

  );
};



const UserTable = ({ users }) => (

  <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box">

    <table className="table w-full">

      <thead>

        <tr className="bg-base-200">
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>

      </thead>


      <tbody>

        {users.map((user) => (

          <tr key={user._id}>

            <td className="font-semibold">
              {user.name}
            </td>


            <td>
              {user.email}
            </td>


            <td>

              <span className="badge badge-primary">
                {user.role}
              </span>

            </td>


            <td>

              <span className="badge badge-success">
                Active
              </span>

            </td>


          </tr>

        ))}

      </tbody>


    </table>

  </div>

);

export default ManageUsers;