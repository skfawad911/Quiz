import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./css/signup.css";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import Login from "./Images/login2.avif";
import wave from "./Images/wave2.svg";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: (values) => {
  //     // Replace the following if block with your hardcoded username and password
  //     if (values.username === "user" && values.password === "pass") {
  //       toast("Sign In successfully");
  //       setTimeout(() => {
  //         navigate("/dashboard");
  //       }, 3000);
  //     } else {
  //       toast.error("Invalid username or password", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //     }
  //   },
  // });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:5050/api/admin-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              AdminId: values.username,
              Password: values.password,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Invalid username or password");
        }

        const data = await response.json();
        // Assuming your API response has a success property
        if (data.success) {
          localStorage.setItem("adminId", data.admin._id);
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);

          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
          toast("Sign In successfully");
        } else {
          throw new Error("Invalid username or password");
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
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
          <img className="adminIMG" src={Login} alt="adminIMG" />
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
          <h3 className="headings">Sign In as an Admin User</h3>
          <p className="saytext">
            Hey, enter your details to sign in to your account{" "}
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-full items-center"
          >
            <FormControl className="w-3/5">
              <InputLabel size="small">Username</InputLabel>
              <OutlinedInput
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                label="Username"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <AccountCircle />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <span className="text-sm text-[#F75454] w-3/5 h-6">
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </span>
            <FormControl className="w-3/5">
              <InputLabel size="small">Password</InputLabel>
              <OutlinedInput
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                label="Password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <span className="text-sm text-[#F75454] w-3/5 h-6">
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </span>
            <Link className="ptaglogin" to="/">
              Having trouble signing in?
            </Link>

            <Stack direction="row" spacing={2}>
              <Button
                className="signupcomon"
                variant="contained"
                type="submit"
                endIcon={<LockOpenOutlinedIcon />}
              >
                SIGN IN
              </Button>
            </Stack>
          </form>

          <div className="icondiv">
            <Button
              variant="outlined"
              className="loginaccount"
              startIcon={<GoogleIcon />}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              className="loginaccount"
              startIcon={<FacebookOutlinedIcon />}
            >
              Facebook
            </Button>
          </div>
          <Link
            to="/signup"
            style={{ color: "grey", fontSize: "14px" }}
            underline="always"
          >
            Don't have an account?&nbsp;
            <span className="text-purple-400 hover:text-purple-600">
              Signup Now
            </span>
          </Link>
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
      </Container>
    </div>
  );
}
