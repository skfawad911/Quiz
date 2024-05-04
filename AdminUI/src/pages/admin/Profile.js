import * as React from "react";
import "./css/profile.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Button, InputAdornment, TextField } from "@mui/material";
import { AccountCircle, Update } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WorkIcon from "@mui/icons-material/Work";
import EditIcon from "@mui/icons-material/Edit";
import BackupIcon from "@mui/icons-material/Backup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const data = JSON.parse(localStorage.getItem("item"));

  const [edit, setEdit] = React.useState(false);
  const [input, setInput] = React.useState({
    username: data.data.username,
    name: data.data.name,
    contact: data.data.contact,
    email: data.data.email,
    role: data.data.role,
    avatar: data.data.avatar,
  });
  const [avatarFile, setAvatarFile] = React.useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  console.log(avatarFile);

  const handleFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (edit === false) {
      setEdit(true);
    } else {
      const updateData = new FormData();
      updateData.append("avatar", avatarFile);
      for (const key in input) {
        updateData.append(key, input[key]);
      }

      axios
        .put(
          `https://bookworm-7xmc.onrender.com/update-user/${data.data._id}`,
          updateData
        )
        .then((res) => {
          console.log(res);
          toast("User Updated successfully");
          setEdit(false);
        })
        .catch((err) => console.error(err));
    }
  };

  React.useEffect(() => {
    setEdit(false);
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="inprofile">
          <Stack className="Profileavatar">
            <Avatar
              alt="Remy Sharp"
              // URL.createObjectURL()
              src={
                avatarFile
                  ? URL.createObjectURL(avatarFile)
                  : "https://bookworm-7xmc.onrender.com/uploads/user/" + data.data.avatar
              }
              sx={{ width: 180, height: 180 }}
            />
            <div id={edit ? "done" : ""} className="mainupload">
              <div className="uploadbox">
                <input
                  id="file-5"
                  name="avatar"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-5" className="iconlable">
                  <BackupIcon className="file" />
                </label>
              </div>
            </div>
          </Stack>
        </div>

        <Box>
          <TextField
            disabled={edit ? false : true}
            className="w-3/5"
            name="username"
            value={input.username}
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
            disabled={edit ? false : true}
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
            disabled
            name="email"
            className="w-3/5"
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
            disabled={edit ? false : true}
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
            disabled={edit ? false : true}
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
              endIcon={edit ? <Update /> : <EditIcon />}
            >
              {edit ? "Update Profile" : "Edit Profile"}
            </Button>
          </Stack>
          <ToastContainer
            position="top-right"
            autoClose={5000}
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
    </>
  );
};

export default Profile;
