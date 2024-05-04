import React from "react";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <div
      style={{
        overflow: "auto",
        height: "88vh",
        boxShadow: "inset 5px 5px 10px #604bd739",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <Outlet />
    </div>
  );
};

export default Index;
