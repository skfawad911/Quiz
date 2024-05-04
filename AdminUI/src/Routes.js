import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Signin from "./pages/admin/Signin";
import UserList from "./pages/User/UserList";
import MainPage from "./pages/main/MainPage";
import Dashboard from "./pages/main/Dashboard";
import About from "./pages/main/About";
import Profile from "./pages/admin/Profile";
import { CategoryList } from "./pages/category/CategoryList";
import { Home } from "./pages/main/Home";
import Signup from "./pages/admin/Signup";
import { ProductList } from "./pages/product/ProductList";
import AddProducts from "./pages/product/AddProducts";
import { AddCategory } from "./pages/category/AddCategory";
import { UpdateUser } from "./pages/User/UpdateUser";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { UserOrderData } from "./components/UserOrderData";
import { ContactInquiry } from "./components/ContactInquiry";
import Reports from "./pages/main/Reports";
import EditQuestion from "./pages/main/EditQuestion";
import MakeAdmins from "./pages/Settings/MakeAdmins";
import Mr from "./pages/Settings/Mr"
export default function Routes() {
  const router = useRoutes([
    {
      path: "/dashboard",
      element: <MainPage />,
      children: [
        { element: <Dashboard />, index: true },
        { path: "/dashboard/questions", element: <Home /> },
        { path: "/dashboard/createquestions", element: <About /> },
        { path: "/dashboard/project", element: <Dashboard /> },
        { path: "/dashboard/user-list", element: <UserList /> },

        { path: "/dashboard/makeadmins", element: <MakeAdmins /> },
        { path: "/dashboard/mr", element: <Mr /> },


        { path: "/dashboard/update-user", element: <UpdateUser /> },
        { path: "/dashboard/Profile", element: <Profile /> },
        { path: "/dashboard/category-list", element: <CategoryList /> },
        { path: "/dashboard/update-category", element: <AddCategory /> },
        { path: "/dashboard/add-category", element: <AddCategory /> },
        { path: "/dashboard/product-list", element: <ProductList /> },
        { path: "/dashboard/add-product", element: <AddProducts /> },
        { path: "/dashboard/update-product", element: <AddProducts /> },
        { path: "/dashboard/userOrder-list", element: <UserOrderData /> },
        { path: "/dashboard/contact-inquiry", element: <ContactInquiry /> },
        { path: "/dashboard/reports", element: <Reports /> },
        { path: "/dashboard/edit/:questionId", element: <EditQuestion /> },
      ],
    },
    { path: "/", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/signin", element: <Signin /> },
    { path: "/dashboard/Logout", element: <Navigate to="/signin" /> },
    { path: "404", element: <ErrorPage /> },
    { path: "*", element: <Navigate to="/404" /> },
  ]);

  return router;
}
