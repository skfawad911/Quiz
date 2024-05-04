// import React from 'react'

// const MakeAdmins = () => {
//   return (
//     <div>MakeAdmins</div>
//   )
// }

// export default MakeAdmins
// export default MakeAdmins
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { verifyUser } from "../../verify";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Tab = ({ label, onClick, isActive }) => {
  return (
    <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
      {label}
    </div>
  );
};
const TabContent = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: ` 1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

async function fetchData(setUserId, setUserRole) {
  try {
    const token = localStorage.getItem("token");
    const data = await verifyUser(token);
    const userRole = data.userRole;
    const userId = data.userId;

    // Now you can use userRole and userId in the rest of your logic
    setUserId(userId);
    setUserRole(userRole);
  } catch (error) {
    console.error("Failed to verify user:", error.message);
  }
}

export default function CustomizedAccordions() {
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetchData(setUserId, setUserRole);
  }, []);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [Name, setName] = useState("");
  const [AdminId, setAdminId] = useState("");
  const [Password, setPassword] = useState("");
  const [Gender, setGender] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  // const [Name, AdminId, Password, Gender, MobileNumber]

  const token = localStorage.getItem("token");

  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if the selected file is a PNG or JPG image
    if (
      selectedFile &&
      (selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg")
    ) {
      // Check the file size (3 MB limit)
      if (selectedFile.size <= 1 * 1024 * 1024) {
        setImage(selectedFile);
        toast.success("Image uploading successfully!")
      } else {
        // Display an error message for large files
        toast.error("Image size should be 2 MB or less.");
      }
    } else {
      // Display an error message for invalid file types
      toast.error("Please select a PNG or JPG image.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast("Please select a valid PNG or JPG image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.put(
      `https://somprazquiz1-2.digilateral.com/api/update-admin-logo/659bad0fe5efaf29c436304a`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      toast.success("admin Logo Updated");
    } else {
      toast.error("error");
    }
  };

  const handleSuperAdminCreate = (e) => {
    e.preventDefault();
    console.log({ Name, AdminId, Password, Gender, MobileNumber });

    try {
      fetch(`https://somprazquiz1-2.digilateral.com/api/create-super-admin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Name, AdminId, Password, Gender, MobileNumber }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          if (res.status === 401) {
            toast("Token Expire,Login Again");
          }
          if (res.status === 400) {
            toast("AdminId Already Exitsts");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Response data:", data);
          if (data.success) {
            toast("Super Admin Created");
          } else if (data.msg === "Main Admin Not Found") {
            toast("Main Admin Not Found");
          } else if (data.msg === "You are not Default admin") {
            toast("You are not Default admin");
          } else if (data.msg === "Can't create more than 3 super admin") {
            toast("Can't create more than 3 super admin");
          } else if (data.msg === "Internal Server Error") {
            toast("Internal Server Error");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } finally {
      setName("");
      setAdminId("");
      setPassword("");
      setGender("");
      setMobileNumber("");
    }
  };

  const handleContentAdminCreate = (e) => {
    e.preventDefault();
    console.log({ Name, AdminId, Password, Gender, MobileNumber });
    try {
      fetch(`https://somprazquiz1-2.digilateral.com/api/create-content-admin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Name, AdminId, Password, Gender, MobileNumber }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          if (res.status === 401) {
            toast("Token Expire,Login Again");
          }
          if (res.status === 400) {
            toast("AdminId Already Exitsts");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Response data:", data);
          if (data.success) {
            toast("Content Admin Created");
          } else if (data.msg === "No Admin Type Found") {
            toast("No Admin Type Found");
          } else if (data.msg === "Content Admin Already Exitsts") {
            toast("Content Admin Already Exitsts");
          } else if (data.msg === "Only SuperAdmin Create Content Admin") {
            toast("Only SuperAdmin Create Content Admin");
          } else if (data.msg === "Internal Server Error") {
            toast("Internal Server Error");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } finally {
      setName("");
      setAdminId("");
      setPassword("");
      setGender("");
      setMobileNumber("");
    }
  };
  const handleReportAdminCreate = (e) => {
    e.preventDefault();
    console.log({ Name, AdminId, Password, Gender, MobileNumber });

    try {
      fetch(`https://somprazquiz1-2.digilateral.com/api/create-report-admin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Name, AdminId, Password, Gender, MobileNumber }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          if (res.status === 401) {
            toast("Token Expire,Login Again");
          }
          if (res.status === 400) {
            toast("Report Admin Already Exitsts");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Response data:", data);
          if (data.success) {
            toast("Report Admin Created");
          } else if (data.msg === "No Admin Type Found") {
            toast("No Admin Type Found");
          } else if (data.msg === "Only SuperAdmin Create Report Admin") {
            toast("Only SuperAdmin Create Report Admin");
          } else if (
            data.msg === "Internal Server Error in Report Admin creation "
          ) {
            toast("Internal Server Error in Report Admin creation ");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } finally {
      setName("");
      setAdminId("");
      setPassword("");
      setGender("");
      setMobileNumber("");
    }
  };

  return (
    <>
      <div>
        {userRole === "1" && (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Create Super Admin</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div class="max-w-2xl  bg-white ">
                  <form onSubmit={handleSuperAdminCreate}>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          placeholder="John"
                          required
                          value={Name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      {/* <div>
                      <label
                        for="last_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        placeholder="Doe"
                        required
                      />
                    </div> */}
                      <div>
                        <label
                          for="company"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                        >
                          Gender
                        </label>
                        <input
                          type="text"
                          id="company"
                          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          placeholder="Flowbite"
                          value={Gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="phone"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                        >
                          Phone number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          placeholder="123-45-678"
                          // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          value={MobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-6">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                      >
                        AdminId
                      </label>
                      <input
                        type="text"
                        id="email"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        placeholder="Enter the AdminId"
                        value={AdminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        required
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}

        {userRole === "SUPER_ADMIN" && (
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Create Content Admin</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div class="max-w-2xl  bg-white ">
                  <form onSubmit={handleContentAdminCreate}>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          // class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          placeholder="John"
                          required
                          value={Name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      {/* <div>
                      <label
                        for="last_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        placeholder="Doe"
                        required
                      />
                    </div> */}
                      <div>
                        <label
                          for="company"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                        >
                          Gender
                        </label>
                        <input
                          type="text"
                          id="company"
                          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          // class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          placeholder="Flowbite"
                          value={Gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="phone"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                        >
                          Phone number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          // class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                          placeholder="123-45-678"
                          // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          value={MobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-6">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                      >
                        Content AdminId
                      </label>
                      <input
                        type="text"
                        id="email"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        // class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        placeholder="Enter the AdminId"
                        value={AdminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        required
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}

        {userRole === "SUPER_ADMIN" && (
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>Create Reporting Manager</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="app-container">
                  <div className="flex">
                    <button
                      className={`${activeTab === "report-admin"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                        } px-4 py-2 rounded-l-lg`}
                      onClick={() => handleTabClick("report-admin")}
                    >
                      Report Admin
                    </button>
                    <button
                      className={`${activeTab === "tab1"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                        } px-4 py-2 rounded-l-lg`}
                      onClick={() => handleTabClick("tab1")}
                    >
                      Tab 1
                    </button>
                    <button
                      className={`${activeTab === "tab2"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                        } px-4 py-2`}
                      onClick={() => handleTabClick("tab2")}
                    >
                      Tab 2
                    </button>
                    <button
                      className={`${activeTab === "tab3"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                        } px-4 py-2 rounded-r-lg`}
                      onClick={() => handleTabClick("tab3")}
                    >
                      Tab 3
                    </button>
                  </div>

                  <div className="content">
                    {activeTab === "report-admin" && (
                      <TabContent>
                        <div class="max-w-2xl  bg-white ">
                          <form onSubmit={handleReportAdminCreate}>
                            <div class="grid gap-6 mb-6 lg:grid-cols-2">
                              <div>
                                <label
                                  for="first_name"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="first_name"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="John"
                                  required
                                  value={Name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                              {/* <div>
                      <label
                        for="last_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        placeholder="Doe"
                        required
                      />
                    </div> */}
                              <div>
                                <label
                                  for="company"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Gender
                                </label>
                                <input
                                  type="text"
                                  id="company"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  // class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="Flowbite"
                                  value={Gender}
                                  onChange={(e) => setGender(e.target.value)}
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="phone"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Phone number
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  // class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="123-45-678"
                                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                  value={MobileNumber}
                                  onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div class="mb-6">
                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                              >
                                AdminId
                              </label>
                              <input
                                type="text"
                                id="email"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                // class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                placeholder="Enter the AdminId"
                                value={AdminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                required
                              />
                            </div>
                            <div class="mb-6">
                              <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                placeholder="•••••••••"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </TabContent>
                    )}
                    {activeTab === "tab1" && (
                      <TabContent>
                        <div class="max-w-2xl  bg-white ">
                          <form onSubmit={handleSuperAdminCreate}>
                            <div class="grid gap-6 mb-6 lg:grid-cols-2">
                              <div>
                                <label
                                  for="first_name"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="first_name"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="John"
                                  required
                                  value={Name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                              {/* <div>
                      <label
                        for="last_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        placeholder="Doe"
                        required
                      />
                    </div> */}
                              <div>
                                <label
                                  for="company"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Gender
                                </label>
                                <input
                                  type="text"
                                  id="company"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="Flowbite"
                                  value={Gender}
                                  onChange={(e) => setGender(e.target.value)}
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="phone"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Phone number
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="123-45-678"
                                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                  value={MobileNumber}
                                  onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div class="mb-6">
                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                              >
                                AdminId
                              </label>
                              <input
                                type="text"
                                id="email"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                placeholder="Enter the AdminId"
                                value={AdminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                required
                              />
                            </div>
                            <div class="mb-6">
                              <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </TabContent>
                    )}
                    {activeTab === "tab2" && (
                      <TabContent>
                        <div class="max-w-2xl  bg-white ">
                          <form>
                            <div class="grid gap-6 mb-6 lg:grid-cols-2">
                              <div>
                                <h1>2</h1>
                                <label
                                  for="first_name"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  id="first_name"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="John"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="last_name"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  id="last_name"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="Doe"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="company"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Company
                                </label>
                                <input
                                  type="text"
                                  id="company"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="Flowbite"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="phone"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Phone number
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="123-45-678"
                                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                  required
                                />
                              </div>
                            </div>
                            <div class="mb-6">
                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                id="email"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                placeholder="john.doe@company.com"
                                required
                              />
                            </div>
                            <div class="mb-6">
                              <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </TabContent>
                    )}
                    {activeTab === "tab3" && (
                      <TabContent>
                        <div class="max-w-2xl  bg-white ">
                          <form>
                            <div class="grid gap-6 mb-6 lg:grid-cols-2">
                              <div>
                                <h1>3</h1>
                                <label
                                  for="first_name"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  id="first_name"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="John"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="last_name"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  id="last_name"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="Doe"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="company"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Company
                                </label>
                                <input
                                  type="text"
                                  id="company"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="Flowbite"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  for="phone"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                >
                                  Phone number
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                  placeholder="123-45-678"
                                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                  required
                                />
                              </div>
                            </div>
                            <div class="mb-6">
                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                id="email"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                placeholder="john.doe@company.com"
                                required
                              />
                            </div>
                            <div class="mb-6">
                              <label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </TabContent>
                    )}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
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
      <div class="flex flex-col gap-4 py-4  lg:flex-row m-14">
        <div class="shrink-0 w-32  sm:py-4">
          <p class="mb-auto font-medium">Admin</p>
          <p class="text-sm text-gray-600">Change your Admin Logo</p>
        </div>
        <div class="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            class="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
          />
          <div className="flex justify-center items-center bg-pink-300 text-black">
            <button
              onClick={(e) => submit(e)}
              className="w-40 h-12 bg-indigo-600 text-black rounded-full"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
