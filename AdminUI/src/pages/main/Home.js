import React, { useState, useEffect } from "react";
import EditQuestion from "./EditQuestion";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [Questions, setQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const gotoEdit = (questionId) => {
    // Use the navigate function to go to the edit page and pass the questionId as a parameter
    navigate(`/dashboard/edit/${questionId}`);
  };

  const filteredQuestions = Questions.filter((question) => {
    const includesSearch = question.question
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const includesCategory =
      selectedCategory === null || question.category === selectedCategory;
    return includesSearch && includesCategory;
  });

  const handleDeleteQuestion = async (questionId) => {
    let baseUrl = `http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5000/api/delquestions/${questionId}`;
    let url = baseUrl;

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      console.log(response.status);
      console.log(questionId);

      if (response.status === 204) {
        // showToastMessageDel()
        // Successfully deleted, you can update your UI or perform any other action here
        //  alert('Question deleted successfully.')
        window.location.reload();
        window.scrollTo(0, 0);

        // Optionally, you can update your questions array or state to reflect the deletion.
      } else if (response.status === 404) {
        console.error("Question not found.");
        // Handle the case where the question was not found.
      } else {
        console.error("Error deleting question.");
        // Handle other errors here.
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      // Handle network or other errors here.
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  //get all questions
  const baseUrl = "http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5000/api/questions";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();

          // Reverse the order of questions and add question numbers
          const reversedData = responseData.reverse().map((question, index) => {
            // Adding the question number (index + 1) to each question
            return {
              ...question,
              questionNumber: index + 1,
            };
          });

          setQuestions(reversedData);
        } else {
          console.error("Error fetching questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  return (
    <>
      <div class="p-4 w-[75vw]  ">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="grid  grid-cols-1  sm:grid-cols-1 md:grid-cols-3 gap-4 mb-4"></div>
          <button
            className={`text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-2 ${
              selectedCategory === null ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </button>
          {Array.from(
            new Set(Questions.map((question) => question.category))
          ).map((category, index) => (
            <button
              key={index}
              className={`text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-2 ${
                selectedCategory === category ? "bg-blue-500" : "bg-gray-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          {/* search bar  */}
          <form>
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
                value={searchInput} // Bind the search input value
                onChange={handleSearchInputChange}
                class="block w-full p-4 pl-10 text-sm  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Questions..."
                required
              />
              {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>

          {/* search bar ends */}

          {/* all questions  */}

          <div class="w-[70vw]   flex items-center justify-center mt-10 h-auto mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative  shadow-md sm:rounded-lg w-full">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-black">
                      Questions - Sorted Based on recently
                    </th>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className=" ">
                  {filteredQuestions.map((question, index) => (
                    <tr
                      key={index}
                      class=" border-b dark:bg-gray-900 dark:border-gray-700 flex justify-between"
                    >
                      <div className="">
                        <div>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900  dark:text-white "
                          >
                            {question.questionNumber}. {question.question}
                          </th>
                        </div>

                        {selectedCategory === null && (
                          <div className="w-[10px]">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900  dark:text-white w-full "
                            >
                              {question.category}
                            </th>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end items-center">
                        <button
                          className="focus:outline-none  ml-[150px] text-white bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => gotoEdit(question._id)}
                        >
                          Edit
                        </button>

                        <button
                          className="text-white bg-red-700  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-8 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          onClick={() => handleDeleteQuestion(question._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
