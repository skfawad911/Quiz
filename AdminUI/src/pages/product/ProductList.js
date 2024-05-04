import React, { useEffect, useState } from "react";

export const ProductList = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const apiUrl = "https://somprazquiz1-2.digilateral.com/api/get/docter/name";

  console.log(doctorsData);

  useEffect(() => {
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDoctorsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.doctorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define a dictionary for category colors
  const categoryColors = {
    Entertainment: "bg-blue-200",
    Astronomy: "bg-yellow-200",
    History: "bg-red-200",
    Science: "bg-green-200",
    Politics: "bg-purple-200",
    Geography: "bg-indigo-200",
    Wildlife: "bg-pink-200",
    Technology: "bg-teal-200",
    Mathematics: "bg-orange-200",
  };

  return (
    <>
      <div className="relative ">
        <h1 className=" text-4xl font-bold text-blue-700 text-center">
          Doctors Summary
        </h1>

        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative w-[95%]">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm  text-gray-900  rounded-lg bg-gray-50 "
            placeholder="Search Doctor Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
        </div>

        <table className="w-[70vw]  mt-[40px] text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 rounded-l-lg text-black text-center"
              >
                EmpID
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-l-lg text-black text-center"
              >
                EmpName
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-l-lg text-black text-center"
              >
                HQ
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-l-lg text-black text-center"
              >
                Region
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-l-lg text-black text-center"
              >
                Doctor Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-l-lg text-black text-center"
              >
                ScCode
              </th>
              <th scope="col" className="px-6 py-3 text-black text-center">
                Categories Played
              </th>
              <th
                scope="col"
                className="px-6 py-3 rounded-r-lg text-black text-center"
              >
                Total Points
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors
              .filter((doctor) =>
                doctor.quizCategories.some((category) => category.isPlayed)
              )
              .map((doctor, index) => (
                <tr
                  className={index % 2 === 0 ? "bg-white" : "dark:bg-gray-800"}
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {doctor.mrId}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {doctor.username}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {doctor.hq}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {doctor.region}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {doctor.doctorName}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {doctor.scCode}
                  </th>

                  <td className="px-6 py-4">
                    {doctor.quizCategories
                      .filter((category) => category.isPlayed)
                      .sort((a, b) => a.TotalPoints - b.TotalPoints) // Sort categories based on Total Points in ascending order
                      .map((category) => (
                        <div
                          key={category._id.$oid}
                          className={`${
                            categoryColors[category.categoryName] ||
                            "bg-gray-200"
                          } p-2 rounded-md`}
                        >
                          {category.categoryName}
                        </div>
                      ))}
                  </td>
                  <td className="px-6 py-4">
                    {doctor.quizCategories
                      .filter((category) => category.isPlayed)
                      .sort((a, b) => a.TotalPoints - b.TotalPoints) // Sort categories based on Total Points in ascending order
                      .map((category) => (
                        <div
                          key={category._id.$oid}
                          className={`${
                            categoryColors[category.categoryName] ||
                            "bg-gray-200"
                          } p-2 rounded-md`}
                        >
                          {category.TotalPoints}
                        </div>
                      ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
