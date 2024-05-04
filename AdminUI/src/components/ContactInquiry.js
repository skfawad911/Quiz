import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { InquiryTable } from "./InquiryTable";

export const ContactInquiry = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    axios
      .get("https://bookworm-7xmc.onrender.com/get-contactdetails")
      .then((res) => setOrder(res.data.data));
  }, []);
  return (
    <div>
      <div className="my-5 ">
        <h2 className="font-semibold text-slate-600 text-xl mb-5 ml-1">
          Inquiries
        </h2>
        <Link to="/dashboard" className="underline text-purple-400	">
          <ArrowBackIcon /> &nbsp; Dashboard
        </Link>
      </div>
      <div>
        <InquiryTable value={order} />
      </div>
    </div>
  );
};
