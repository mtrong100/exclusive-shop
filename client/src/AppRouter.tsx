import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import MyOrder from "./pages/MyOrder";
import About from "./pages/About";
import ProducDetail from "./pages/ProducDetail";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageProduct from "./pages/admin/product/ManageProduct";
import AddNewProduct from "./pages/admin/product/AddNewProduct";
import EditProduct from "./pages/admin/product/EditProduct";

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
      </Route>
    </Routes>
  );
};

export default AppRouter;
