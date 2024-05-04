import React, { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./css/bookcard.css";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";

const TABS = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "In Stock",
    value: "In Stock",
  },
  {
    label: "Out Of Stock",
    value: "Out Of Stock",
  },
];

const TABLE_HEAD = [
  "Book Image",
  "Book Title",
  "Price",
  "Author/BookFormat",
  "Status",
  "Action",
];

export const BookCard = ({ value }) => {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(null);
  const onChange = ({ target }) => setSearch(target.value);
  const [data, setData] = React.useState(value);
  const [currnet, setCurrent] = useState(1);

  let row = 5;
  let totalpage = Math.ceil(data.length / row);
  const filterData = useMemo(() => {
    const startInd = (currnet - 1) * row;
    const endind = currnet * row;
    return data.slice(startInd, endind);
  }, [data, currnet, row]);

  const filterValue = (e) => {
    setCurrent(1);
    if (e === "Out Of Stock") {
      const newData = value.filter((el, ind) => el.status === 0);
      setData([...newData]);
    }
    if (e === "All") {
      const newData = value.filter(
        (el, ind) => el.status === 1 || el.status === 0
      );
      setData([...newData]);
    }
    if (e === "In Stock") {
      const newData = value.filter((el, ind) => el.status === 1);
      setData([...newData]);
    }
  };
  function deleteFun(index) {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  }
  const deletebtn = async (e) => {
    console.log(e);
    await axios
      .delete(`https://bookworm-7xmc.onrender.com/delete-product/${e}`)
      .then((res) => toast(`${res.data.message}`))
      .catch((err) => toast(`${err.res.data.message}`));
  };
  const navigate = useNavigate();
  const editbtn = (e) => {
    navigate("/dashboard/update-product", { state: { data: e } });
  };

  return (
    <div className="p-5">
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
      <Card className="h-full w-full p-3 BookCard">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-5 mx-5 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" className="text-lg" color="blue-gray">
                All Books list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all Books
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link to="/dashboard/add-product">
                <Button
                  variant="outlined"
                  style={{ color: "#614BD7", border: " 1px solid #614BD7" }}
                >
                  <AddIcon strokeWidth={2} className="h-4 w-4" /> Add Books
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex mx-5 flex-col- items-center justify-between gap-5 md:flex-row">
            <Tabs value="all" className="w-full">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    className="tabs font-bold	"
                    onClick={() => filterValue(label)}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="search relative border-solid border-2 rounded-s	flex gap-1 items-center pl-5 pr-1">
              <div>
                <SearchIcon />
              </div>
              <Input
                type="search"
                placeholder="Search…"
                className="search-input"
                onChange={onChange}
                style={{
                  width: "320px",
                  border: "none",
                  outline: "none",
                  padding: "10px ",
                }}
              />
              <Button
                variant="outlined"
                className=" rounded-s	"
                style={{
                  backgroundColor: search ? "#ADA7EF" : "grey",
                  padding: "6px 15px",
                  color: "white",
                  transition: "all 0.5s",
                  border: "none",
                }}
                disabled={!search}
              >
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      // color="blue-gray"
                      className="flex items-center justify-between gap-2 font-bold	"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterData.map(
                (
                  {
                    _id,
                    images,
                    title,
                    price,
                    author,
                    bookformat,
                    status,
                    shortDescription,
                    description,
                    quantity,
                    categoryId,
                  },
                  index
                ) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "px-4 py-3 border-b border-blue-gray-50";
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div
                          style={{
                            width: "60px",
                            objectFit: "cover",
                            marginLeft: "10px",
                          }}
                        >
                          <Avatar
                            src={
                              "https://bookworm-7xmc.onrender.com/uploads/product/" +
                              images[0]
                            }
                            alt={title}
                            size="sm"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div
                          className="flex flex-col"
                          style={{ width: "150px" }}
                        >
                          <Typography
                            variant="small"
                            // color="blue-gray"
                            className="font-normal line-clamp-2	"
                          >
                            {title}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div>
                          <Typography variant="small">${price}</Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {author}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {bookformat}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            className="text-center"
                            value={status === 1 ? "InStock" : "Out Of Stock"}
                            color="green"
                            style={{
                              color: status === 1 ? "#05b171" : "#ea4444",
                            }}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="forrelative">
                          <IconButton
                            edge="end"
                            onClick={() => deleteFun(index)}
                            className={open === index ? "maindot" : "active"}
                          >
                            <MoreVertIcon />
                            <div className="dotbtn">
                              <ul>
                                <li
                                  onClick={() =>
                                    editbtn({
                                      _id,
                                      images,
                                      title,
                                      price,
                                      author,
                                      bookformat,
                                      status,
                                      shortDescription,
                                      description,
                                      quantity,
                                      categoryId,
                                    })
                                  }
                                >
                                  <EditIcon /> Edit
                                </li>
                                <li onClick={() => deletebtn(_id)}>
                                  <DeleteIcon /> Delete
                                </li>
                              </ul>
                            </div>
                          </IconButton>
                          <span className="after"></span>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currnet} of {totalpage}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="small"
              style={{ color: "#614BD7", border: " 1px solid #614BD7" }}
              onClick={() => setCurrent(currnet - 1)}
              disabled={currnet === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              style={{ color: "#614BD7", border: " 1px solid #614BD7" }}
              disabled={currnet === totalpage}
              onClick={() => setCurrent(currnet + 1)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
