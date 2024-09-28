import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./components/pages/CreateProductPages/CreateProduct";
import Products from "./components/pages/ProductsPages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<CreateProduct />} />
        <Route path="/" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
