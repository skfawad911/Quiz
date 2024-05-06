import React, { useState } from "react";
import { css } from "@emotion/react";

import { MoonLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";
import ExFile from "./QuestionsSetSamplefinal.csv";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiFileExcel2Fill } from "react-icons/ri";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const AllDataExcel = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
  });
  const id = localStorage.getItem("adminId");
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please choose a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Show loading spinner
      setLoading(true);

      const response = await fetch(
        `http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5050/api/upload-sheet/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Hide loading spinner on success
        setLoading(false);
        toast("Question Sheet Uploaded Success ");
        // alert("CSV added to the database successfully!");
      } else {
        // Hide loading spinner on failure
        setLoading(false);
        // alert("Error: CSV upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Hide loading spinner on error
      setLoading(false);
      // alert("An error occurred while uploading the CSV.");
    }
  };

  return (
    <>
      <div className="flex justify-center h-full ">
        <div className=" bg-white   rounded-lg  p-[30px] shadow-lg ">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Upload Mrs , Doctor Data
          </h2>
          <div className="flex justify-center relative ">
            {loading && (
              <MoonLoader
                color={"#36D7B7"}
                loading={loading}
                css={override}
                size={100} // You can adjust the size as needed
                className="relative"
              />
            )}

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
          </div>
          <form
            onSubmit={handleUpload}
            encType="multipart/form-data"
            className="flex flex-col items-center"
          >
            <div {...getRootProps()} className="dropzone mb-4">
              <input {...getInputProps()} />
              <p>
                <g id="Open_Folder-2" data-name="Open Folder">
                  <RiFileExcel2Fill
                    style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  />
                </g>
                {/* <svg
                    class="w-[20px] cursor-pointer aspect-square  group-hover:scale-105 "
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Open_Folder-2" data-name="Open Folder">
                      <path
                        d="m45 18h-4v-4a2.996 2.996 0 0 0 -3-3h-15.25a2.9991 2.9991 0 0 1 -2.33-1.11l-1.96-2.41a3.9846 3.9846 0 0 0 -3.1-1.48h-11.36a2.996 2.996 0 0 0 -3 3v29.57a3.3672 3.3672 0 0 0 1.01 2.42 3.3672 3.3672 0 0 0 2.42 1.01h33.66a3.441 3.441 0 0 0 3.3-2.47l5.53-18.97a2.003 2.003 0 0 0 -1.92-2.56z"
                        fill="#376cfb"
                      />
                      <path
                        d="m44.9987 18h-28.4262a3.43 3.43 0 0 0 -3.2925 2.47l-5.56 19.0614a3.4286 3.4286 0 0 1 -3.2914 2.4686h33.6638a3.43 3.43 0 0 0 3.2933-2.47l5.5331-18.97a2 2 0 0 0 -1.9201-2.56z"
                        fill="#4294ff"
                      />
                    </g>
                  </svg> */}
                {file
                  ? `File selected: ${file.name}`
                  : "Drag & drop or click to select a excel file"}
              </p>
            </div>

            <button
              type="submit"
              value="Upload"
              className="relative w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-full transition duration-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              Upload
            </button>

            <div className="mt-4">
              <p className="text-sm">
                Download the sample Excel file{" "}
                <a
                  href={ExFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AllDataExcel;
