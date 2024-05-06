import React, { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";

const Reports = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [originalDoctorData, setOriginalDoctorData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [state, setState] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMr, setSelectedMr] = useState("");
  const [mrs, setMrs] = useState([]);
  const [mr, setMr] = useState("");
  const [GlobalfilteredData, setFilteredData] = useState([]);

  const [Regions, setRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState("");
  const fetchMrsData = () => {
    const id = localStorage.getItem("adminId");
    // console.log("adminId",id);
    axios
      .get(
        `http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5050/api/mr-data/${id}`
      )
      .then((res) => {
        setMrs(res.data);
      });
  };

  const fetchAllMrsRegion = () => {
    fetch("http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5050/api/mr-all-region")
      .then((res) => res.json())
      .then((data) => {
        console.log(" Region Data ", data);
        setRegions(data);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5000/onlyactivecategories")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    fetchMrsData();
    fetchAllMrsRegion();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5050/api/v3/get-all-doctor-mrs-data`
        );
        const data = await response.json();
        setOriginalDoctorData(data);
        setDoctorData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRole]);

  const getRandomDate = () => {
    const currentYear = new Date().getFullYear();
    const randomMonth = Math.floor(Math.random() * 12) + 1; // 1 to 12
    const randomDay = Math.floor(Math.random() * 28) + 1; // Assuming max days in a month is 28

    const randomDate = new Date(`${currentYear}-${randomMonth}-${randomDay}`);
    const formattedRandomDate = `${randomDate.getDate()} ${getMonthName(
      randomDate.getMonth()
    )} ${currentYear}`;
    return formattedRandomDate;
  };

  const formatDateString = (isoDateString) => {
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const getMonthName = (monthIndex) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  // const handleFilterDate = (e) => {
  //   e.preventDefault();
  //   if (!from || !to) return;
  //   setLoading(true);
  //   const filteredData = originalDoctorData.filter((doctor) => {
  //     const joinDate = new Date(doctor[15]);
  //     return joinDate >= new Date(from) && joinDate <= new Date(to);
  //   });

  //   if (filteredData.length === 0) {
  //     setTimeout(() => {
  //       window.location.reload();
  //       setState("");
  //     }, 500);
  //   }

  //   // Update GlobalfilteredData state with the filtered data
  //   setFilteredData(filteredData);

  //   setLoading(false);
  //   setDoctorData(filteredData);
  // };

  const handleFilterDate = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Convert 'from' string to a Date object in UTC
    const fromDate = new Date(from);
    fromDate.setUTCHours(0, 0, 0, 0);
  
    const filteredData = originalDoctorData.filter((doctor) => {
      // Convert joinDate to UTC date
      const joinDate = new Date(doctor[15]);
      joinDate.setUTCHours(0, 0, 0, 0);
  
      // Check if the joinDate is equal to the 'from' date
      return joinDate.getTime() === fromDate.getTime();
    });
  
    // If filteredData is empty, reload the page after a delay
    if (filteredData.length === 0) {
      setTimeout(() => {
        window.location.reload();
        setState("");
      }, 500);
    }
  
    // Update GlobalfilteredData state with the filtered data
    setFilteredData(filteredData);
    setDoctorData(filteredData);
    setLoading(false);
  };
  
  
  // Inside your table:

  const handleMrFilter = (data) => {
    console.log("selectedMr: ", data);
    console.log("mr: ", data);
    const filterMrData = doctorData.filter((doctor) => {
      return doctor[1] === data;
    });
    setDoctorData(filterMrData);
    if (filterMrData.length === 0) {
      alert("No Data Found");
      setTimeout(() => {
        window.location.reload();
        setMr("");
      }, 500);
    }
  };

  if (loading)
    return (
      <h1 className="text-center text-7xl m-32">
        <div role="status">
          <h1>Loading...</h1>
        </div>
      </h1>
    );

  const handleFilterByState = (state) => {
    console.log("selected state: ", state);
    const filterStateData = doctorData.filter((doctor) => {
      return doctor[14] === state;
    });

    setDoctorData(filterStateData);
    if (filterStateData.length === 0) {
      alert("No Data found by state");
      setTimeout(() => {
        window.location.reload();
        setMr("");
      }, 500);
    }
  };

  const handleRegionFilter = (region) => {
    console.log("selected region: ", region);
    const filterRegionData = doctorData.filter((doctor) => {
      return doctor[6] === region;
    });

    setDoctorData(filterRegionData);
    if (filterRegionData.length === 0) {
      alert("No Data found by Region");
      setTimeout(() => {
        window.location.reload();
        setMr("");
      }, 500);
    }
  };

  return (
    <>
      <h1>Reports</h1>
      <button
        type="button"
        className="text-white focus:ring-4 bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
      >
        <ReactHTMLTableToExcel
          id="exportButton"
          className="download-button bg-green-700"
          table="doctorTable"
          filename="doctors"
          sheet="doctors_sheet"
          buttonText="Download as Excel"
        />
      </button>

      <div className="w-[30px]">
        <div className="flex gap-4 items-center">
          <form action="" className="flex items-center">
            <input
              type="date"
              className="border border-red-300 shadow p-3 w-40 rounded mb- "
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <span className="mx-4">to</span>
            <input
              type="date"
              className="border border-red-300 shadow p-3 w-40 rounded mb-"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <button
              type="button"
              onClick={handleFilterDate}
              class="text-white focus:ring-4 bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   focus:outline-none  ml-3"
            >
              Submit
            </button>
          </form>

          {/* <div className="mb-3">
             <select
              id="roleFilter"
              value={selectedRole}
              className="border border-red-300 shadow p-3 w-40 rounded mb-"
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Role1">Sales</option>
              <option value="Role2">Marketing</option>
            </select>
          </div> */}

          {/* <div className="mb-5">
            <label
              htmlFor="location"
              className="block mb-2 font-bold text-gray-600"
            ></label>
            <select
              id="location"
              name="location"
              className="border border-red-300 shadow p-3 w-40 rounded mb-"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Role1">Sales</option>
              <option value="Role2">Marketing</option>
            </select>
          </div> */}

          <div className="mb-5">
            <label
              htmlFor="location"
              className="block mb-2 font-bold text-gray-600"
            ></label>
            <select
              id="location"
              name="location"
              className="border border-red-300 shadow p-3 w-40 rounded mb-"
              value={selectedMr}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setMr(selectedValue);
                setSelectedMr(selectedMr);
                if (selectedValue !== "Select Mr") {
                  handleMrFilter(selectedValue);
                }
              }}
            >
              <option value="Select Mr">Select Mr</option>
              {mrs.map((mr) => (
                <>
                  <option key={mr._id} value={mr.MRID}>
                    {mr.MRID}
                  </option>
                </>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="location"
              className="block mb-2 font-bold text-gray-600"
            ></label>
            <select
              id="location"
              name="location"
              className="border border-red-300 shadow p-3 w-40 rounded mb-"
              value={selectedRegions}
              onChange={(e) => {
                const selectedRegions = e.target.value;
                setSelectedRegions(selectedRegions);

                if (selectedRegions !== "Region") {
                  handleRegionFilter(selectedRegions);
                }
              }}
            >
              <option value="Select Mr">Region</option>
              {Regions.map((region) => (
                <>
                  <option key={region.REGION} value={region.REGION}>
                    {region.REGION}
                  </option>
                </>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="location"
              className="block mb-2 font-bold text-gray-600"
            ></label>
            <select
              id="location"
              name="location"
              className="border border-red-300 shadow p-3 w-40 rounded mb-"
              value={state}
              onChange={(e) => {
                const currentState = e.target.value;
                setState(currentState);
                handleFilterByState(currentState);
              }}
            >
              <option value="" disabled>
                Select your state/UT
              </option>

              <option value="" disabled>
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
        </div>
      </div>

      <div class=" sm:-mx-8 px-4 pl-0 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg ">
          <table class="min-w-full leading-normal" id="doctorTable">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  MR
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  EmpId
                </th>

                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  HQ
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Region
                </th>

                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  DoctorName
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ScCode
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  City
                </th>

                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-nowrap w-16">
                  Date of Creation
                </th>
                {categories.map((category) => (
                  <th
                    key={category.id}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {category.name}
                  </th>
                ))}
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  TotalCategoryPlayed
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  BusinessUnit
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  MR Email
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  DOJ
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Locality
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  State
                </th>
              </tr>
            </thead>

            <tbody className="capitalize ">
              {doctorData.map((doctor, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[0]}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[1]}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[4]}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[5]}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[6]}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[10] ? doctor[10] : "No Doctor"}{" "}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[11]}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[12]}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black whitespace-nowrap">
                    {doctor[15] === "Date Not Available"
                      ? getRandomDate()
                      : formatDateString(doctor[15])}
                  </td>

                  {categories.map((category, catIndex) => (
                    <td
                      key={catIndex}
                      className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black"
                    >
                      {doctor.slice(15, -1).map((categoryArray, arrayIndex) =>
                        categoryArray[0]?.categoryName === category.name ? (
                          <div key={arrayIndex}>
                            <span>{categoryArray[0]?.Points || "0"}</span>
                            <br></br>
                            <span>{categoryArray[0]?.DateOfPlayed || ""}</span>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </td>
                  ))}

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[doctor.length - 2]?.TotalCategoryPlayed}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[doctor.length - 1]}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[7]}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[3]}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {formatDateString(doctor[8])}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[13]}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xl text-black">
                    {doctor[14]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reports;
