import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditQuestion = () => {
  const { questionId } = useParams();

  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [answerOptions, setAnswerOptions] = useState([
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
  ]);

  const maxQuestionLength = 40;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxQuestionLength) {
      setQuestion(value);
    }
  };

  const remainingCharacters = Math.max(0, maxQuestionLength - question.length);

  const maxAnswerOptionLength = 8;

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

  const handleCorrectAnswerChange = (id) => (e) => {
    console.log("hh");
  
    setAnswerOptions(prevOptions => {
      // Use map to create a new array with updated options
      const updatedOptions = prevOptions.map(option => {
        // Find the option with the specified id
        if (option._id === id) {
          // Update the 'isCorrect' property for the selected option
          return { ...option, isCorrect: true };
        } else {
          // For other options, set 'isCorrect' to false
          return { ...option, isCorrect: false };
        }
      });
  
      return updatedOptions;
    });
  };
  

  useEffect(() => {
    // Fetch question details based on questionId
    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(
          `http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5000/api/getquestion/${questionId}`
        );

        if (response.ok) {
          const questionData = await response.json();
          setQuestion(questionData.question);
          setCategory(questionData.category);
          setLevel(questionData.level);
          setAnswerOptions(questionData.answerOptions);
        } else {
          console.error("Error fetching question details");
        }
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5000/api/updatequestions/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            category,
            level,
            answerOptions,
          }),
        }
      );

      if (response.ok) {
        console.log("Question updated successfully");
        // Optionally, you can redirect the user to another page or perform other actions after successful update.
      } else {
        console.error("Error updating question");
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <>
      

      <div className="  flex items-center justify-center  w-full">
        <div className="absolute bg-black opacity-40"></div>
        <div className=" bg-white w-full h-auto p-[30px] rounded-lg text-center shadow-lg z-50">
          <h2 className="text-2xl font-semibold mb-4">Update the Question</h2>
          <label className="block mb-2">
            Question:
            <input
              type="text"
              value={question}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 mt-1"
              maxLength={maxQuestionLength} // Limit the maximum length
            />
            <div className="text-sm text-gray-500">
              {remainingCharacters} character(s) remaining
            </div>
          </label>
          <label className="block mb-2">
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md py-2 px-3 mt-1"
            />
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

          <h3 className="text-lg font-medium mb-2">Answer Options:</h3>
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
                {remainingAnswerOptionCharacters(index)} character(s) remaining
              </div>
              <label className="mt-1 flex items-center space-x-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={option.isCorrect}
                  onChange={handleCorrectAnswerChange(option._id)}
                  className="h-5 w-5 text-blue-500"
                />
                <span className="text-gray-600">Correct Answer</span>
              </label>
            </div>
          ))}
          <button
            onClick={handleEdit}
            className="w-full mt-4 bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600"
          >
            Update Question
          </button>
        </div>
      </div>
    </>
  );
};

export default EditQuestion;
