import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "orderid", headerName: "OrderID", width: 70 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "totalprice", headerName: "Total Amount", width: 150 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "paymod", headerName: "Payment Method", width: 170 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      const statusValue = Math.floor(Math.random() * 3);
      const statusText =
        statusValue === 1
          ? "Shipped"
          : statusValue === 2
          ? "Completed"
          : statusValue === 0
          ? "Proccesing"
          : "Refunded";

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
                ? "#293134"
                : statusValue === 2
                ? "#05B171"
                : statusValue === 0
                ? "#FAAE42"
                : "#FAAE42",
          }}
        >
          {statusText}
        </div>
      );
    },
  },
];

export const OrderCard = ({ value }) => {
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
