import * as React from "react";
import "./Appbar.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "30px",
    backgroundColor: "white",
    borderRadius: "7px",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "45ch",
      },
    },
  },
}));

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Appbar = () => {
  const data = JSON.parse(localStorage.getItem("item"));


  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const mainClick = (e) => {
    console.log(e);

    if (e === "Logout") {
      localStorage.clear();
      <Navigate to="/" />;
    }
  };
  const handleUser = () => {
    navigate("/dashboard/userOrder-list");
  };
  const [order, setOrder] = React.useState([]);

  return (
    <>
      <div className="appbar">
        <div className="left">
          <div className="overview">

          </div>
          <div className="search">

          </div>

          {/* <div>
            <Link>
              <button onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                navigate("/");
              }}>Logout?</button>

            </Link>
          </div> */}
        </div>

        <div className="right">
          <div className="socialIcon">
            {/* <MenuItem onClick={handleUser}>
              <Badge badgeContent={order.length} color="error">
                <MailIcon style={{ color: "#614BD7" }} />
              </Badge>
            </MenuItem> */}
            {/* <MenuItem onClick={() => navigate("/dashboard/contact-inquiry")}>
              <Badge badgeContent={order1.length} color="error">
                <NotificationsIcon style={{ color: "#614BD7" }} />
              </Badge>
            </MenuItem> */}
          </div>
          <div>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, ind) => (
                  <Link
                    key={ind}
                    style={{
                      textDecoration: "none",
                      color: setting === "Logout" ? "red" : "black",
                    }}
                    onClick={() => mainClick(setting)}
                    to={"/dashboard/" + setting}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appbar;
