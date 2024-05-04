import React, { useEffect, useState } from "react";
import Model from "./Model";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Input,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";

const Mr = () => {
  const [mrs, setMrs] = useState([]);
  console.log(mrs);
  const [loading, setloading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  let [stat, setStatus] = useState(0);

  const [open, setOpen] = React.useState(false);

  const [mrdetails, setMrDetails] = useState({
    id: "",
    USERNAME: "",
    MRID: "",
    EMAIL: "",
    ROLE: "",
    HQ: "",
    REGION: "",
    BUSINESSUNIT: "",
  });

  const handleOpen = (id) => {
    console.log("id:", id);
    setOpen(!open);
  };

  const id = localStorage.getItem("adminId");

  useEffect(() => {
    setloading(true);
    fetch(
      `https://somprazquiz1-2.digilateral.com/api/admin-mrs/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMrs(data);
        setloading(false);
      });
  }, [id, stat]);

  function fetMrData(id) {
    fetch(`https://somprazquiz1-2.digilateral.com/api/get-mr-by-id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMrDetails({
          id: data._id,
          USERNAME: data.USERNAME,
          MRID: data.MRID,
          EMAIL: data.EMAIL,
          ROLE: data.ROLE,
          HQ: data.HQ,
          REGION: data.REGION,
          BUSINESSUNIT: data.BUSINESSUNIT,
        });
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setMrDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    console.log({ mrdetails });
  };

  const handleUpdateMr = () => {
    fetch("https://somprazquiz1-2.digilateral.com/api/update-mr-details", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(mrdetails),
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.status);
        setStatus((stat += 1));
        toast.success("MR details updated successfully"); // Display success toast
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      toast.error("Failed to update MR details"); // Display error toast
    });
  
    handleOpen();
  };

  return (
    <>
      <div>
        {loading === true ? (
          <p className="text-center text-6xl">Loading....</p>
        ) : (
          <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-8">
            <div class="flex items-center justify-between pb-6">
              <div>
                <h2 class="font-semibold text-gray-700">Mr Details</h2>
              </div>
            </div>
            <div class="overflow-y-hidden rounded-lg border w-full">
              <div class="overflow-x-auto">
                <table class="w-[auto]">
                  <thead>
                    <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                      <th class="px-5 py-3">Sr.</th>
                      <th class="px-5 py-3">USERNAME</th>
                      <th class="px-5 py-3">MRID</th>
                      <th class="px-5 py-3">BUSINESSUNIT</th>
                      <th class="px-5 py-3">EMAIL</th>
                      <th class="px-5 py-3">HQ</th>
                      <th class="px-5 py-3">REGION</th>
                      <th class="px-5 py-3">ROLE</th>
                      <th class="px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-500">
                    {mrs &&
                      mrs.map((mr, index) => (
                        <tr key={index}>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{index + 1}</p>
                          </td>

                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{mr.USERNAME}</p>
                          </td>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{mr.MRID}</p>
                          </td>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{mr.BUSINESSUNIT}</p>
                          </td>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{mr.EMAIL}</p>
                          </td>

                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{mr.HQ}</p>
                          </td>

                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{mr.REGION}</p>
                          </td>

                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{mr.ROLE}</p>
                          </td>

                          <td class="border  border-gray-900 bg-white px-5 py-5 text-sm">
                            <button
                              class="rounded-full bg-green-200 w-full md:h-[55px] px-10 py-10 text-xs font-semibold text-green-900"
                              onClick={() => {
                                handleOpen(mr._id);
                                fetMrData(mr._id);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <>
        <Dialog
          open={open}
          handler={handleOpen}
          size="md"
          style={{
            alignItems: "center",
            width: "500px",
            marginLeft: "1500px",
            position: "absolute",
            border: "1px solid black",
            maxHeight: "80vh", // Set maximum height to 80% of the viewport height
            overflowY: "auto", 
          }}
        >
          <DialogHeader>Edit MR</DialogHeader>
          <DialogBody className="">
            <Card color="transparent" shadow={false}>
              {/* <Typography variant="h4" color="blue-gray">
                Sign Up
              </Typography> */}
              {/* <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
              </Typography> */}
              <form onSubmit>
                <div class="grid gap-6 mb-6 lg:grid-cols-2">
                  <div>
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                      // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      value={mrdetails.USERNAME}
                      onChange={handleInputChange}
                      name="USERNAME"
                      required
                    />
                  </div>

                  <div>
                    <label
                      for="company"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="company"
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                      // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Flowbite"
                      value={mrdetails.EMAIL}
                      onChange={handleInputChange}
                      name="EMAIL"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                    >
                      MRID
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                      // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="123-45-678"
                      value={mrdetails.MRID}
                      // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      onChange={handleInputChange}
                      name="MRID"
                      required
                    />
                  </div>
                </div>
                <div class="mb-6">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    HQ
                  </label>
                  <input
                    type="text"
                    id="email"
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter the AdminId"
                    value={mrdetails.HQ}
                    onChange={handleInputChange}
                    name="HQ"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="password"
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    value={mrdetails.ROLE}
                    name="ROLE"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    Bussiness Unit
                  </label>
                  <input
                    type="text"
                    id="password"
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="test"
                    value={mrdetails.BUSINESSUNIT}
                    name="BUSINESSUNIT"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                  >
                    Region
                  </label>
                  <input
                    type="text"
                    id="password"
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    // class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="test"
                    value={mrdetails.REGION}
                    name="REGION"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </form>
            </Card>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="outlined"
              color="green"
              onClick={() => {
                handleUpdateMr(id);
              }}
            >
              <span>Update</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
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

export default Mr;
