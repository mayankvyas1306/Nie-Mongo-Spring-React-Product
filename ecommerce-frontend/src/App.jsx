import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import ViewProduct from "./pages/ViewProduct";
import EditProduct from "./pages/EditProduct";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/view/:id" element={<ViewProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;