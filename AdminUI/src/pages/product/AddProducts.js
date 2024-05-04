import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const AddProducts = () => {
  const [mrid, setMrid] = useState([]);
  console.log(mrid);
  const [formData, setFormData] = useState({
    name: "",
    sccode: "",
    state: "",
    locality: "",
    city: "",
    mrid: "",
    speciality: "",
  });
  const id = localStorage.getItem("adminId");

  useEffect(() => {
    const fetchMrid = async () => {
      try {
        const response = await fetch(
          `http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5050/api/mr-data/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setMrid(data);
        } else {
          console.error("Error fetching mrid:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching mrid:", error);
      }
    };

    fetchMrid();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("MY FORM DATA", formData);
      const response = await fetch(
        "http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5050/api/v2/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctorName: formData.name,
            city: formData.city,
            state: formData.state,
            scCode: formData.sccode, // Ensure correct key here
            locality: formData.locality,
            speciality: formData.speciality,
            mrId: formData.mrid,
          }),
        }
      );

      if (response.ok) {
        // Handle success, e.g., redirect or show a success message
        console.log("Data posted successfully");
        toast.success("Doctor added successfully!");
      } else {
        console.error("Error posting data:", response.statusText);
        toast.error("Failed to add doctor. Please try again.");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className=" min-h-screen flex items-center">
        <div className="w-full">
          <h1 className=" text-4xl font-bold text-blue-700 text-center">
            Add Doctor Form
          </h1>
          <div className="bg-white p-10 rounded-lg shadow w-full mx-auto ">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="mrid"
                  className="block mb-2 font-bold text-gray-600"
                >
                  MRID
                </label>
                <select
                  id="mrid"
                  name="mrid"
                  onChange={handleInputChange}
                  className=" shadow p-3 w-full rounded mb-"
                >
                  <option value="" selected disabled>
                    Select the MR Name
                  </option>
                  {mrid.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.mrName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={handleInputChange}
                  name="name"
                  placeholder="Doctor Name"
                  className="border border-gray-300 shadow p-3 w-full rounded mb-"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="scCode"
                  className="block mb-2 font-bold text-gray-600"
                >
                  ScCode
                </label>
                <input
                  type="text"
                  id="sccode"
                  onChange={handleInputChange}
                  name="sccode"
                  placeholder="Doctor SCCode."
                  className=" shadow p-3 w-full rounded mb-"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="speciality"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Speciality
                </label>
                <input
                  type="text"
                  id="speciality"
                  onChange={handleInputChange}
                  name="speciality"
                  placeholder="Doctor Speciality"
                  className=" shadow p-3 w-full rounded mb-"
                />
              </div>
              <div class="mb-5">
                <label
                  htmlFor="state"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Select State/UT
                </label>
                <select
                  id="state"
                  name="state"
                  onChange={handleInputChange}
                  className=" shadow p-3 w-full rounded mb-"
                >
                  <option value="" selected disabled>
                    Select your state/UT
                  </option>

                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>

                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="city"
                  className="block mb-2 font-bold text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  onChange={handleInputChange}
                  name="city"
                  placeholder="Doctor City"
                  className=" shadow p-3 w-full rounded mb-"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="locality"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Locality
                </label>
                <input
                  type="text"
                  id="locality"
                  onChange={handleInputChange}
                  name="locality"
                  placeholder="Doctor Locality"
                  className=" shadow p-3 w-full rounded mb-"
                />
              </div>

              <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AddProducts;
