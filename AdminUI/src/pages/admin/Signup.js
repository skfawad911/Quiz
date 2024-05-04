import * as React from "react";
import "./css/signup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import admin from "./Images/admin2.jpg";
import wave from "./Images/wave1.svg";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      contact: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contact: Yup.string()
        .matches(/^\d+$/, "Invalid phone number")
        .required("Contact is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      axios
        .post("https://bookworm-7xmc.onrender.com/signup-user", values)
        .then((response) => {
          console.log(response);
          toast("User Added successfully");
          resetForm();
          navigate("/signin")
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${wave})`,
        backgroundRepeat: "no-repeat",
        objectFit: "contain",
        backgroundPositionY: "bottom",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& > *": { width: "50%" },
          boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ "& > *": { width: "50%" } }}>
          <img className="adminIMG" src={admin} alt="adminIMG" />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
            flexDirection: "column",
            borderLeft: "1px solid rgba(0,0,0,0.3)",
          }}
        >
          <h3 className="headings">Sign up as a Admin User</h3>

          <form
            onSubmit={formik.handleSubmit}
            className=" w-3/5 flex flex-col items-center"
          >
            <TextField
              name="username"
              type="text"
              label="Username"
              className="w-3/5"
              size="small"
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="text-sm text-[#F75454] h-6 w-full">
              {formik.touched.username && formik.errors.username ? (
                <div className="error h-6">{formik.errors.username}</div>
              ) : null}
            </span>

            <TextField
              name="name"
              type="text"
              label="Name"
              className="w-3/5"
              size="small"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="text-sm text-[#F75454] h-6 w-full">
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </span>

            <TextField
              name="email"
              type="email"
              label="Email"
              className="w-3/5"
              size="small"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="text-sm text-[#F75454] h-6 w-full">
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </span>

            <TextField
              name="contact"
              type="number"
              label="Contact"
              className="w-3/5"
              size="small"
              fullWidth
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="text-sm text-[#F75454] h-6 w-full">
              {formik.touched.contact && formik.errors.contact && (
                <div className="error">{formik.errors.contact}</div>
              )}
            </span>

            <FormControl className="w-full">
              <InputLabel size="small">Password</InputLabel>
              <OutlinedInput
                name="password"
                size="small"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <span className="text-sm text-[#F75454] h-6 w-full">
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </span>

            <Stack>
              <Button
                className="signupcommon"
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
                style={{ backgroundColor: "#ADA7EF" }}
              >
                SIGN UP
              </Button>
            </Stack>
          </form>

          <Link
            to="/signin"
            style={{ color: "grey", fontSize: "14px" }}
            underline="always"
          >
            Already have an account?&nbsp;
            <span className="text-purple-400 hover:text-purple-600">
              Sign In here
            </span>
          </Link>
        </Box>
      </Container>
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
  );
}
