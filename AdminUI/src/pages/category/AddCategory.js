import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: false, // Set the default value for isActive
  });

  const handleChange2 = (event) => {
    const value = event.target.value;
    if (value.length <= 10) {
      setFormData({ ...formData, description: value });
    }
  };
  const remainingCharacters = Math.max(0, 10 - formData.description.length);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5000/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Category created successfully!");
        toast.success("Category created successfully!");
        setFormData({
          name: "",
          description: "",
          isActive: true,
        });
        // Refresh the category list after creating a new category
        // fetchCategories();
      } else {
        const errorData = await response.json(); // Parse error response as JSON
        console.error("Failed to create category:", errorData);
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create category");
    }
  };

  return (
    <>
      <div className="mx-auto mt-8 p-6 w-full bg-white shadow-lg rounded-md">
        <h1 className=" text-4xl font-bold text-blue-700 text-center">
          Create a New Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange2}
              required
              rows="4"
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <div className="text-sm text-gray-500">
              {remainingCharacters} character(s) remaining
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Create Category
            </button>
          </div>
        </form>
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
