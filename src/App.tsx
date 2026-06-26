import { Routes, Route } from "react-router-dom";

import Admin from "./pages/ Admin";
import Products from "./components/Products";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Routes>
      {/* Orders Page */}
      <Route path="/" element={<Admin />} />

      {/* Products Page */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
