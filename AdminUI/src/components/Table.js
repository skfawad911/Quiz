import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BlockIcon from "@mui/icons-material/Block";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const CustomActionsCell = ({ params }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate("/dashboard/update-user", { state: { data: params.row } });

    handleClose();
  };

  const handleDelete = async () => {
    const status = params.row.status === 1 ? { status: 0 } : { status: 1 };
    await axios
      .put(`https://bookworm-7xmc.onrender.com/update-user/${params.row._id}`, status)
      .then((res) => toast("User blocked"))
      .catch((err) => console.log(err));

    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            "&:hover": {
              backgroundColor: "#dcd9f84a",
            },
            marginX: "10px",
            borderRadius: "4px",
          }}
        >
          <ModeEditIcon />
          &nbsp;Edit
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          style={{ color: params.row.status ? "red" : "green" }}
          sx={{
            "&:hover": {
              backgroundColor: "#dcd9f84a",
            },
            marginX: "10px",
            borderRadius: "4px",
          }}
        >
          {params.row.status ? <BlockIcon /> : <HowToRegIcon />}&nbsp;
          {params.row.status ? "Block" : "Unblock"}
        </MenuItem>
      </Menu>
    </div>
  );
};

const columns = [
  {
    field: "avatar",
    headerName: "Profile",
    width: 95,
    renderCell: (params) => {
      return (
        <div
          style={{
            width: "4.5rem",
            height: "4.5rem",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={"https://bookworm-7xmc.onrender.com/uploads/user/" + params.row.avatar}
            alt="avatar"
          />
        </div>
      );
    },
  },
  { field: "username", headerName: "Username", width: 90 },
  { field: "name", headerName: "Full Name", width: 160 },
  { field: "role", headerName: "Role", width: 100 },
  { field: "contact", headerName: "Contact", width: 100 },
  { field: "email", headerName: "Email", width: 250 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      const statusValue = params.row.status;
      const statusText = statusValue === 1 ? "Active" : "Blocked";

      return (
        <div
          style={{
            fontWeight: "600",
            color: statusValue === 1 ? "#05b171" : "#ea4444",
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
    width: 100,
    renderCell: (params) => {
      return <CustomActionsCell params={params} />;
    },
  },
];

const Table = ({ data }) => {
  return (
    <div
      style={{
        height: 600,
        borderRadius: "7px",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <DataGrid
        style={{ border: "none" }}
        rows={data}
        columns={columns}
        getRowId={(rows) => rows._id}
        rowHeight={80}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
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
        theme="light"
      />
    </div>
  );
};

export default Table;
