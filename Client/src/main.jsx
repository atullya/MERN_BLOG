import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Guest/Home.jsx";
import Signup from "./Component/Authentication/Signup.jsx";
import Login from "./Component/Authentication/Login.jsx";
import AuthHome from "./Pages/Auth/AuthHome.jsx";
import AllUserPost from "./Pages/Auth/Page/AllUserPost.jsx";
import NewPost from "./Pages/Auth/Dashboard/NewPost.jsx";
import UploadNewPost from "./Pages/Auth/Page/UploadNewPost.jsx";
import Contact from "./Pages/Guest/Contact.jsx";
import StatsPage from "./Pages/Auth/Page/StatsPage.jsx";
import UserProfile from "./Pages/Auth/Page/UserProfile.jsx";
import FullBlogPage from "./Pages/Guest/FullBlogPage.jsx";
import ReadOtherBlogs from "./Pages/Auth/Page/ReadOtherBlogs.jsx";
import BlogDetails from "./Pages/Auth/Page/BlogDetails.jsx";
import AdminHome from "./Pages/Admin/AdminPage/AdminHome.jsx";
import Price from "./Component/Pricing/Price.jsx";
import EsewaPayment from "./Component/Pricing/EsewaPayment.jsx";
import UserDetail from "./Pages/Admin/AdminPage/UserDetail.jsx";
import AllBlogs from "./Pages/Admin/AdminPage/AllBlogs.jsx";
import Error404 from "./Pages/Pagenotfound/Error404.jsx";
const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "authhome",
    element: <AuthHome />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "posts",
    element: <AllUserPost />,
  },
  {
    path: "newpost",
    element: <UploadNewPost />,
  },
  {
    path: "stats",
    element: <StatsPage />,
  },
  {
    path: "userprofile",
    element: <UserProfile />,
  },
  {
    path: "fullblog/:blogid",
    element: <FullBlogPage />,
  },
  {
    path: "viewblog",
    element: <ReadOtherBlogs />,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetails />,
  },
  {
    path: "/price",
    element: <Price />,
  },
  {
    path: "esewa",
    element: <EsewaPayment />,
  },

  //admin routes
  {
    path: "/admin",
    element: <AdminHome />,
  },
  {
    path: "/alluser",
    element: <UserDetail />,
  },
  {
    path: "/allblogs",
    element: <AllBlogs />,
  },

  //page not found
  {
    path: "*",
    element: <Error404 />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>
);
