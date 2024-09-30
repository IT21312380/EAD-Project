import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./components/pages/CreateProductPages/CreateProduct";
import Products from "./components/pages/ProductsPages/Products";
import UpdateProduct from "./components/pages/UpdateProduct/UpdateProduct";
import VendorOrderListPage from "./components/pages/VendorOrderPages/VendorOrderListPage";
import CSROrderList from "./components/pages/CSROrderPages/CSROrderList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<CreateProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/ven-orders" element={<VendorOrderListPage />} />
        <Route path="/csr-orders" element={<CSROrderList />} />
      </Routes>
    </Router>
  );
}

export default App;
