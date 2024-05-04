import React, { useState, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";
import ImageUpload from "./UploadJSX/ImageUpload";
import { ToastContainer, toast } from "react-toastify";

const About = () => {
  const [file, setFile] = useState(null);

  // handling csv upload starts
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://adminsomprazquiz1-2.digilateral.com/api/upload-csv-file",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // showToastMessage()
        toast.success("CSV added to the database successfully!");
      } else {
        toast.error("Error: CSV upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the CSV.");
    }
  };

  return (
    <>
      <div class="p-4 ">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* <h1 className='text-2xl'>Question </h1> */}
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center justify-center rounded p-[30px]   h-auto dark:bg-gray-800">
              <SingleQuestion />
            </div>
            <div class="flex  justify-center rounded h-[90vh] relative top-[30px] dark:bg-gray-800">
              <ImageUpload />
            </div>
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

export default About;
