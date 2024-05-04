import * as React from "react";
import "./css/update.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Button, InputAdornment, TextField } from "@mui/material";
import { AccountCircle, Update } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [input, setInput] = React.useState({
    username: state.data.username,
    name: state.data.name,
    contact: state.data.contact,
    email: state.data.email,
    role: state.data.role,
    avatar: state.data.avatar,
  });
  const [avatarFile, setAvatarFile] = React.useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    const updateData = new FormData();
    console.log(updateData);
    updateData.append("avatar", avatarFile);
    for (const key in input) {
      updateData.append(key, input[key]);
    }

    axios
      .put(`https://bookworm-7xmc.onrender.com/update-user/${state.data._id}`, updateData)
      .then((res) => {
        toast("User Updated successfully");
        setTimeout(() => {
          navigate("/dashboard/user-list");
        }, 2000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-between">
      <div>
        <div className="flex flex-col gap-5 sticky top-5">
          <h2 className=" font-semibold text-slate-600 text-xl">
            Update User..
          </h2>
          <Link to="/dashboard/user-list" className="underline text-purple-400	">
            <ArrowBackIcon /> &nbsp; UserList
          </Link>
        </div>
      </div>
      <div className="bg-white p-5 w-3/5">
        <div
          className="flex gap-10 items-center py-3"
          style={{ borderBottom: "2px solid black" }}
        >
          <Stack className="">
            <Avatar
              alt="Remy Sharp"
              className="shadow-xl"
              src={
                avatarFile
                  ? URL.createObjectURL(avatarFile)
                  : "https://bookworm-7xmc.onrender.com/uploads/user/" + input.avatar
              }
              sx={{ width: 180, height: 180 }}
            />
          </Stack>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "123px",
              height: "41px",
              borderRadius: "5px",
              marginTop: "100px",
            }}
          >
            <div className="">
              <input
                className="opacity-0 cursor-pointer"
                id="file-5"
                name="avatar"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <label
              htmlFor="file-5"
              style={{
                backgroundColor: "#614BD7",
                color: "white",
                padding: "10px 8px",
                position: "absolute",
                top: "0",
                cursor: "pointer",
              }}
            >
              Change Avatar
            </label>
          </div>
        </div>

        <Box className="flex flex-col gap-5 py-5">
          <TextField
            className="w-3/5"
            name="username"
            value={input.username}
            disabled
            onChange={handleChange}
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="icons">
                  <AdminPanelSettingsIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            className="w-3/5"
            name="name"
            value={input.name}
            onChange={handleChange}
            id="input-with-icon-textfield"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="icons">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            name="email"
            className="w-3/5"
            disabled
            value={input.email}
            onChange={handleChange}
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="icons">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            className="w-3/5"
            name="contact"
            value={input.contact}
            onChange={handleChange}
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="icons">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />

          <TextField
            className="w-3/5"
            name="role"
            value={input.role}
            onChange={handleChange}
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="icons">
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              onClick={handleSubmit}
              style={{
                border: " 1px solid #ada7ef",
                color: "#ada7ef",
                padding: "8px 15px",
                marginTop: "15px",
              }}
            >
              Update Profile &nbsp;
              <Update />
            </Button>
          </Stack>
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
        </Box>
      </div>
    </div>
  );
};
