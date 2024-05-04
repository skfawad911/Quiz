import React, { useState } from "react";
import axios from "axios";
import './test.css'

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [filled, setFilled] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("name", "mahi");
      console.log(file);
      try {
        const header = "Access-Control-Allow-Origin";
        const response = await axios.post(
          "https://adminsomprazquiz1-2.digilateral.com/api/upload-csv-file",
          formData,
          header,
          {
            onUploadProgress: (progressEvent) => {
              const progress =
                (progressEvent.loaded / progressEvent.total) * 100;
              setFilled(progress);
            },
          }
        );
        console.log(response, "response");

        if (response.status === 200) {
          setUploadStatus("success");
          setFile(null); // Reset file state
          setFilled(0); // Reset progress bar
        } else {
          setUploadStatus("error");
        }
      } catch (error) {
        console.error("File upload error:", error);
        setUploadStatus("error");
      }
    }
  };

  return (
    <div>
      <div className="progressbar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#a66cff",
            transition: "width 0.5s",
          }}
        ></div>
        <span className="progressPercent">{filled.toFixed(2)}%</span>
      </div>
      {uploadStatus === "success" && (
        <p style={{ color: "green" }}>File uploaded successfully!</p>
      )}
      {uploadStatus === "error" && (
        <p style={{ color: "red" }}>File upload failed. Please try again.</p>
      )}
      <input type="file" onChange={handleFileChange} />
      <button className="btn" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}