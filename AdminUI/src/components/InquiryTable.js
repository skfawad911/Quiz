import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "subject", headerName: "Subject", width: 200 },
  { field: "details", headerName: "Details", width: 240 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      const statusValue = Math.floor(Math.random() * 3);
      const statusText =
        statusValue === 1
          ? "Resolved"
          : statusValue === 2
          ? "Proccesing"
          : "Declined";

      return (
        <div
          style={{
            fontWeight: "600",
            color: "white",
            fontSize: "10px",
            padding: "3px 13px",
            borderRadius: "2rem",
            backgroundColor:
              statusValue === 1
                ? "#05B171"
                : statusValue === 2
                ? "#FAAE42"
                : "#ea4444",
          }}
        >
          {statusText}
        </div>
      );
    },
  },
];

export const InquiryTable = ({ value }) => {
  return (
    <>
      <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
        <DataGrid
          rows={value}
          columns={columns}
          getRowId={(rows) => rows._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[7, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
};
