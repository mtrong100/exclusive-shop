import Wishlist from "./pages/Wishlist";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProducDetail from "./pages/ProducDetail";
import MyOrder from "./pages/MyOrder";
import ManageUser from "./pages/admin/user/ManageUser";
import ManageProduct from "./pages/admin/product/ManageProduct";
import ManageOrder from "./pages/admin/order/ManageOrder";
import ManageCategory from "./pages/admin/category/ManageCategory";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EditProduct from "./pages/admin/product/EditProduct";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import AddNewProduct from "./pages/admin/product/AddNewProduct";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/order" element={<MyOrder />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProducDetail />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-product" element={<ManageProduct />} />
        <Route path="/manage-product/add-new" element={<AddNewProduct />} />
        <Route path="/manage-product/edit/:id" element={<EditProduct />} />
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/manage-order" element={<ManageOrder />} />
        <Route path="/manage-user" element={<ManageUser />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
