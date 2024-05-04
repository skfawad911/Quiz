import React from "react";
import Sidebar from "../../layouts/sidebar/Sidebar";
import Appbar from "../../layouts/appbar/Appbar";
import Index from "./Index";

const MainPage = () => {
  return (
    <div className="App">
      <title>Sompraz Quiz Admin</title>
      
      <div className="main">
        <Sidebar />
        <div className="container">
          <Appbar />
          <Index />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
