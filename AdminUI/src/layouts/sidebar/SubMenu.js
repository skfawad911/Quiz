import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom"

const SubMenu = ({ item }) => {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title" onClick={() => setOpen(!open)}>
          <span className="item-in">
            <div className="itemicons">
              {item.icon && <i className={item.icon}></i>}
            </div>
            <span className="titles"> {item.title}</span>
            <i className="bi bi-arrow-right-short toggle-btn"></i>
          </span>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (


            <SubMenu key={index} item={child} />
          ))}
        </div>
        <div className="sidebar-content">


        </div>

      </div>
    );
  } else {
    return (
      <NavLink to={item.path || "#"} className="sidebar-item plain">
        <div className="itemicons">
          {item.icon && <i className={item.icon}></i>}
        </div>
        <span className="titles"> {item.title}</span>


      </NavLink>
    );
  }
};
export default SubMenu;
