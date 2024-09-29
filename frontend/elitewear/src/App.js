import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./components/pages/CreateProductPages/CreateProduct";
import Products from "./components/pages/ProductsPages/Products";
import UpdateProduct from "./components/pages/UpadeteProduct/UpdateProduct";
import OrderListPage from "./components/pages/OrderPages/OrderListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<CreateProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<OrderListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
