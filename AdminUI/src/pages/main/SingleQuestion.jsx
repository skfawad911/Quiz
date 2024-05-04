import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const SingleQuestion = () => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [answerOptions, setAnswerOptions] = useState([
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
  ]);

  const maxQuestionLength = 200;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxQuestionLength) {
      setQuestion(value);
    }
  };

  const remainingCharacters = Math.max(0, maxQuestionLength - question.length);

  const handleAddQuestion = async () => {
    const newQuestionData = {
      question,
      category,
      level,
      answerOptions,
    };

    let baseUrl = "http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5000/api/createquestions";

    let url = baseUrl;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestionData),
      });

      if (response.ok) {
        // Question added successfully, you can handle success here
        alert("Question Created Wowow");
        // showToastMessage();
        toast.success("Question added successfully");
        // console.log("Question added successfully");
      } else {
        // Handle error responses here
        console.error("Error adding question:", response.statusText);
        toast.error("Error adding question.");
      }
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error("Error adding question:", error);
      
    }

    // Clear the form after submission
    setQuestion("");
    setCategory("");
    setLevel("");
    setAnswerOptions([
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ]);
  };

  const maxAnswerOptionLength = 25;

  const handleAnswerOptionChange = (index) => (e) => {
    const value = e.target.value;
    if (value.length <= maxAnswerOptionLength) {
      const updatedOptions = [...answerOptions];
      updatedOptions[index].answer = value;
      setAnswerOptions(updatedOptions);
    }
  };

  const remainingAnswerOptionCharacters = (index) => {
    const length = answerOptions[index].answer.length;
    return Math.max(0, maxAnswerOptionLength - length);
  };

  const handleCorrectAnswerChange = (index) => (e) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index].isCorrect = e.target.checked;
    setAnswerOptions(updatedOptions);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5000/onlyactivecategories"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div className="absolute bg-black opacity-40"></div>
        <div className=" bg-white w-full h-auto  rounded-lg  p-[30px] shadow-lg z-50">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Add a Single Question
          </h2>
          <label className="block mb-2 text-lg font-medium">
            Question:
            <input
              type="text"
              value={question}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 mt-1"
              maxLength={maxQuestionLength} // Limit the maximum length
            />
            <div className="text-sm text-gray-500 flex justify-end">
              {remainingCharacters} of {maxQuestionLength}
            </div>
          </label>
          <label className="block mb-2 text-lg font-medium">
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md py-2 px-3 mt-1"
            >
              <option value="" disabled>
                Select
              </option>
              {categories
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort the categories alphabetically
                .map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </label>

          <label className="block mb-2">
            Level:
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
          </label>

          <label htmlFor="" className="text-lg block font-medium mb-2">
            Answer Options
          </label>
          {answerOptions.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.answer}
                onChange={handleAnswerOptionChange(index)}
                className="w-full border rounded-md py-2 px-3 mt-1"
                maxLength={maxAnswerOptionLength} // Limit the maximum length
              />
              <div className="text-sm text-gray-500">
                {remainingAnswerOptionCharacters(index)} of{" "}
                {maxAnswerOptionLength}
              </div>
              <label className="mt-1 flex items-center  ">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={option.isCorrect}
                  onChange={handleCorrectAnswerChange(index)}
                  className="h-5 w-5  text-blue-500  "
                />

                <span className="text-gray-600 ">Correct Answer</span>
              </label>
            </div>
          ))}
          <button
            onClick={handleAddQuestion}
            className="w-full mt-4 bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600"
          >
            Add Question
          </button>
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

export default SingleQuestion;
