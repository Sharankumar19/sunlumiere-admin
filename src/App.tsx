import { Routes, Route } from "react-router-dom";

import Admin from "./pages/ Admin";
import Products from "./components/Products";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import Customers from "./components/Customer";

function App() {
  return (
    <Routes>
      {/* Orders Page */}
      <Route path="/" element={<Admin />} />

      {/* Products Page */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/products/add" element={<AddProduct />} />
         <Route path="/customer" element={<Customers />} />
    </Routes>
  );
}

export default App;
