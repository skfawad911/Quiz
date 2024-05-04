import React, { useEffect, useState } from "react";
import SubMenu from "./SubMenu";
import items from "./SidebarData.json";
import "./Sidebar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import Logo from "../../assets/app-icon.jpg";
import { verifyUser } from "../../verify";

const Sidebar = () => {
  const routeRoles = {
    "/dashboard": ["1", "SUPER_ADMIN"],
    "/dashboard/questions": ["1", "SUPER_ADMIN", "CONTENT_ADMIN"],
    "/dashboard/createquestions": ["1", "CONTENT_ADMIN", "SUPER_ADMIN"],
    "/dashboard/product-list": ["1", "CONTENT_ADMIN", "SUPER_ADMIN"],
    "/dashboard/add-product": ["1", "CONTENT_ADMIN", "SUPER_ADMIN"],
    "/dashboard/add-category": ["1", "CONTENT_ADMIN", "SUPER_ADMIN"],
    "/dashboard/category-list": ["1", "CONTENT_ADMIN", "SUPER_ADMIN"],
    "/dashboard/user-list": ["1", "SUPER_ADMIN"],
    "/dashboard/makeadmins": ["1"],
    "/dashboard/reports": ["1", "SUPER_ADMIN", "REPORT_ADMIN"],
  };

  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData(setUserId, setUserRole);
  }, []);

  console.log(userId, userRole);
  console.log(typeof userRole);

  async function fetchData(setUserId, setUserRole) {
    try {
      const token = localStorage.getItem("token");
      const data = await verifyUser(token);
      const userRole = data.userRole;
      const userId = data.userId;

      setUserId(userId);
      setUserRole(userRole);
    } catch (error) {
      console.error("Failed to verify user:", error.message);
    }
  }

  const mainClick = (e) => {
    console.log(e);

    if (e === "Logout") {
      localStorage.clear();
      <Navigate to="/" />;
    }
  };

  const [logo, setLogo] = useState("");

  // const fetchLogo = () => {
  //   fetch(
  //     "http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5050/api/get-logo/659bad0fe5efaf29c436304a"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log("data; ", data);
  //       setLogo(data.image);
  //     });
  // };
  // console.log("logo: ", logo);

  // useEffect(() => {
  //   fetchLogo();
  // }, []);

  return (
    <>
      <div className="sidebarmain">
        <div className="sidebar-header">
          {/* <div className="w-[70px] grid items-center mt-[20px]">
            <img
              src={`http://main-alb-773490635.ap-south-1.elb.amazonaws.com:5050/${logo}`}
              className="w-full"
            />
          </div> */}
        </div>
        <div className="sidebar-body mt-[10px]">
          <div className="dropdown">
            <NavLink to="/dashboard">
              <div className=" flex  items-center text-black text-4xl">
                {localStorage.getItem("name")}{" "}
              </div>
            </NavLink>
          </div>
          <ul>
            {/* for content_admin */}

            {userRole === "CONTENT_ADMIN" && (
              <div className="sidebar">
                {items.map(
                  (item, index) =>
                    userRole === "CONTENT_ADMIN" &&
                    (item.title === "Categories" ||
                      item.title === "Doctors" ||
                      item.title === "Questions") && (
                      <SubMenu key={index} item={item} />
                    )
                )}
              </div>
            )}

            {/* for super admin */}

            {userRole === "SUPER_ADMIN" && (
              <div className="sidebar">
                `
                {items.map(
                  (item, index) =>
                    userRole === "SUPER_ADMIN" && (
                      <SubMenu key={index} item={item} />
                    )
                )}
              </div>
            )}

            {/* for role 1 */}
            {userRole === "1" && (
              <div className="sidebar">
                {items.map(
                  (item, index) =>
                    userRole === "1" && <SubMenu key={index} item={item} />
                )}
              </div>
            )}

            {/* for report admin */}

            {userRole === "REPORT_ADMIN" && (
              <div className="sidebar">
                {items.map(
                  (item, index) =>
                    userRole === "REPORT_ADMIN" &&
                    item.title === "Reports" && (
                      <SubMenu key={index} item={item} />
                    )
                )}
              </div>
            )}
            <div>
              {/* <Link> */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout?
              </button>

              {/* </Link> */}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
