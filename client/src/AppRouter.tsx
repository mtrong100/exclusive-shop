import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

/* Lazy load component */
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Shop = lazy(() => import("./pages/Shop"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const ProducDetail = lazy(() => import("./pages/ProducDetail"));
const MyOrder = lazy(() => import("./pages/MyOrder"));
const ManageUser = lazy(() => import("./pages/admin/user/ManageUser"));
const ManageProduct = lazy(() => import("./pages/admin/product/ManageProduct"));
const ManageOrder = lazy(() => import("./pages/admin/order/ManageOrder"));
const ManageCategory = lazy(
  () => import("./pages/admin/category/ManageCategory")
);
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const EditProduct = lazy(() => import("./pages/admin/product/EditProduct"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Cart = lazy(() => import("./pages/Cart"));
const AddNewProduct = lazy(() => import("./pages/admin/product/AddNewProduct"));
const About = lazy(() => import("./pages/About"));

const mainRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <Home /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/profile", element: <Profile /> },
  { path: "/shop", element: <Shop /> },
  { path: "/order", element: <MyOrder /> },
  { path: "/about", element: <About /> },
  { path: "/product/:id", element: <ProducDetail /> },
];

const adminRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/manage-product", element: <ManageProduct /> },
  { path: "/manage-product/add-new", element: <AddNewProduct /> },
  { path: "/manage-product/edit/:id", element: <EditProduct /> },
  { path: "/manage-category", element: <ManageCategory /> },
  { path: "/manage-order", element: <ManageOrder /> },
  { path: "/manage-user", element: <ManageUser /> },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {mainRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {route.element}
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route element={<DashboardLayout />}>
        {adminRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {route.element}
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;
