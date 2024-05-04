import React from "react";
import "./error.css";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export const ErrorPage2 = () => {
  document.title = "Page Not Found ";
  return (
    <div>
      <section className="page_404">
        <div className="containerError">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center ">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>
                  <p className="msgs">
                    Oops! The page you are looking for not avaible!
                  </p>
                  <Button
                    to="/dashboard"
                    size="large"
                    variant="outlined"
                    className="ErrorBtn"
                    style={{ color: "#39AD31", border: " 1px solid #39AD31" }}
                    component={RouterLink}
                  >
                    Go to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
