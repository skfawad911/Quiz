import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CustomActionsCell = ({ row }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    navigate("/dashboard/update-category", { state: { data: row } });
    handleClose();
  };

  const handleDeleteClick = () => {
    axios
      .delete(`https://bookworm-7xmc.onrender.com/delete-category/${row._id}`)
      .then((res) => {
        toast(`${res.data.message}`);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleEditClick}
          sx={{
            "&:hover": {
              backgroundColor: "#dcd9f84a",
            },
            marginX: "10px",
            borderRadius: "4px",
          }}
        >
          <ModeEditIcon /> &nbsp; Edit
        </MenuItem>
        <MenuItem
          onClick={handleDeleteClick}
          style={{ color: "red" }}
          sx={{
            "&:hover": {
              backgroundColor: "#dcd9f84a",
            },
            marginX: "10px",
            borderRadius: "4px",
          }}
        >
          <DeleteIcon />
          &nbsp; Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "createAt", headerName: "Create Date", width: 240 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      const statusValue = params.row.status;
      const statusText = statusValue === 1 ? "In Stock" : "Out of Stock";
      return (
        <div
          style={{
            color: statusValue === 1 ? "#05b171" : "#ea4444",
            fontWeight: "600",
            marginLeft: "10px",
          }}
        >
          {statusText}
        </div>
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return <CustomActionsCell row={params.row} />;
    },
  },
];

export const CategoryCard = ({ value }) => {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "white",
      }}
    >
      <DataGrid
        rows={value}
        columns={columns}
        getRowId={(rows) => rows._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[5, 7, 10]}
        checkboxSelection
      />
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
        color="white"
      />
    </div>
  );
};
