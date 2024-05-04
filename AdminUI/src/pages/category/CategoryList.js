import React, { useEffect, useState } from "react";
import Modal from "react-modal";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const maxActiveCategories = 4;

  const handleDelete = async (categoryId) => {
    // Display the delete confirmation modal
    setShowDeleteConfirmation(true);
    setCategoryToDelete(categoryId);
  };

  const onDeleteCategory = async (updatedCategories) => {
    fetchCategories();
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5000/categories/${categoryToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedCategories = categories.map((category) =>
          category._id === categoryToDelete
            ? { ...category, isDeleted: true }
            : category
        );
        onDeleteCategory(updatedCategories);
        setCategoryToDelete(null);
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error while deleting category:", error);
    }

    // Close the delete confirmation modal
    setShowDeleteConfirmation(false);
  };

  const closeDeleteConfirmation = () => {
    setCategoryToDelete(null);
    setShowDeleteConfirmation(false);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  // const handleToggle = async (categoryId, currentStatus) => {
  //   try {
  //     const activeCategoriesCount = categories.filter(
  //       (category) => category.isActive
  //     ).length;

  //     // Allow toggling only if the limit is not exceeded
  //     if (
  //       (currentStatus && activeCategoriesCount > 1) ||
  //       (!currentStatus && activeCategoriesCount < maxActiveCategories)
  //     ) {
  //       const response = await fetch(
  //         `http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5000/updatecategory/${categoryId}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ isActive: !currentStatus }), // Toggle the active status
  //         }
  //       );

  //       if (response.ok) {
  //         console.log("Category updated successfully!");
  //         // Refresh the category list after updating the active status
  //         fetchCategories();
  //       } else {
  //         console.error("Failed to update category");
  //       }
  //     } else {
  //       // Show custom-styled popup when the limit is exceeded
  //       setShowPopup(true);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const [lastDeactivatedCategoryId, setLastDeactivatedCategoryId] =
    useState(null);
  const [lastDeactivatedTimestamp, setLastDeactivatedTimestamp] = useState(0);

  const handleToggle = async (categoryId, currentStatus) => {
    try {
      const activeCategoriesCountBeforeToggle = categories.filter(
        (category) => category.isActive
      ).length;

      console.log(activeCategoriesCountBeforeToggle);

      const response = await fetch(
        `http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5000/updatecategory/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: !currentStatus }), // Toggle the active status
        }
      );

      if (response.ok) {
        console.log("Category updated successfully!");

        // Fetch updated categories after a successful toggle
        await fetchCategories();

        const activeCategoriesCountAfterToggle = categories.filter(
          (category) => category.isActive
        ).length;

        console.log("Active Cat" + activeCategoriesCountAfterToggle);

        if (
          (currentStatus && activeCategoriesCountBeforeToggle > 1) ||
          (!currentStatus &&
            activeCategoriesCountAfterToggle <= maxActiveCategories)
        ) {
          if (activeCategoriesCountAfterToggle <= maxActiveCategories) {
            setLastDeactivatedCategoryId(
              currentStatus ? categoryId : lastDeactivatedCategoryId
            );
            setLastDeactivatedTimestamp(new Date().getTime());
          }
        } else {
          // Show custom-styled popup when the limit is exceeded
          setShowPopup(true);
        }
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const activateLastDeactivatedCategory = async () => {
      if (lastDeactivatedCategoryId) {
        const now = new Date().getTime();
        const timeDifference = now - lastDeactivatedTimestamp;

        // Check if less than 10 seconds have passed since the last deactivation
        if (timeDifference < 10000) {
          await handleToggle(lastDeactivatedCategoryId, false);
          setLastDeactivatedCategoryId(null); // Reset the last deactivated category
        }
      }
    };

    if (lastDeactivatedCategoryId) {
      // Automatically toggle the last inactive category after 3 seconds
      const timeoutId = setTimeout(activateLastDeactivatedCategory, 3000);

      // Clear the timeout when the component is unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [lastDeactivatedCategoryId, categories]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5000/allcategories"
      );
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  return (
    <>
      <div className="mt-8">
        <div className=" mt-8 p-4 w-[100%] h-screen  ">
          <Modal
            isOpen={showPopup}
            onRequestClose={closePopup}
            contentLabel="Limit Exceeded Popup"
            className="bg-white p-6 rounded-md w-[800px] mx-auto mt-20 text-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <p className="text-xl font-semibold mb-4">
              There can be only four active categories.
            </p>
            <p className="mb-4">Deactivate one to activate another.</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closePopup}
            >
              Close
            </button>
          </Modal>
          {/* show deleted confirmation starts */}
          <Modal
            isOpen={showDeleteConfirmation}
            onRequestClose={closeDeleteConfirmation}
            contentLabel="Delete Confirmation Modal"
            className="bg-white p-6 rounded-md w-[400px] mx-auto mt-20 text-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <p className="text-xl font-semibold mb-4">
              Are you sure you want to delete this category because Once Deleted
              cannot be retrieved?
            </p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 focus:outline-none"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded ml-4 hover:bg-gray-400 focus:outline-none"
                onClick={closeDeleteConfirmation}
              >
                Cancel
              </button>
            </div>
          </Modal>

          {/* show deleted confirmation ends */}
          <h1 className=" text-4xl font-bold text-blue-700 text-center">
            Category List
          </h1>

          <ul className="p-[40px]">
            {categories.map((category) => (
              <li
                key={category._id}
                className="mb-2 flex items-center justify-between"
              >
                <div className="w-[300px]  flex justify-start ">
                  <span className="mr-2 uppercase text-xl font-extrabold">
                    {category.name}
                  </span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.isActive}
                    onChange={() =>
                      handleToggle(category._id, category.isActive)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>

                <button
                  type="button"
                  onClick={() => handleDelete(category._id)}
                  disabled={category.isDeleted}
                  className={`focus:outline-none text-white ${
                    category.isDeleted
                      ? "bg-gray-400"
                      : "bg-red-700 hover:bg-red-800"
                  } focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
                >
                  {category.isDeleted ? "Deleted" : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
