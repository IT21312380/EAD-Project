import logo from "./logo.svg";
import "./App.css";
import { useAuthContext } from "./hooks/useAutContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./components/pages/CreateProductPages/CreateProduct";
import Products from "./components/pages/ProductsPages/Products";

import VendorLogin from "./components/pages/VendorLoginPages/VendorLogin"
import AdminLogin from "./components/pages/AdminLoginPages/AdminLogin"
import CSRLogin from "./components/pages/CSRloginPages/CSRLogin"
import VendorProfile from "./components/pages/VendorProfilePages/VendorProfilePage"
import RegisterVendor from "./components/pages/RegisterVendorPages/RegisterVendor";
import AllUsers from "./components/pages/AllUsersPages/AllUsers";
import UpdateVendorProfile from "./components/pages/VendorUpdatePages/VendorUpdatePage";

import UpdateProduct from "./components/pages/UpdateProduct/UpdateProduct";
import VendorOrderListPage from "./components/pages/VendorOrderPages/VendorOrderListPage";
import CSROrderList from "./components/pages/CSROrderPages/CSROrderList";
import CSRNotificationList from "./components/pages/CSRNotificationPages/CSRNotificationList";

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<CreateProduct />} />

        <Route path="/" element={<Products />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/csr-login" element={<CSRLogin />} />
        <Route path="/vendor-profile" element={<VendorProfile />} />
        <Route path="/vendor-register" element={<RegisterVendor />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/vendor-update" element={<UpdateVendorProfile />} />

        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/vendor-orders" element={<VendorOrderListPage />} />
        <Route path="/csr-orders" element={<CSROrderList />} />
        <Route path="/csr-notifications" element={<CSRNotificationList />} />

      </Routes>
    </Router>
  );
}

export default App;
