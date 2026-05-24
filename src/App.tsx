import { Routes, Route } from "react-router-dom";

import Admin from "./pages/ Admin";
import Products from "./components/Products";

function App() {
  return (
    <Routes>
      {/* Orders Page */}
      <Route path="/" element={<Admin />} />

      {/* Products Page */}
      <Route
        path="/products"
        element={<Products />}
      />
    </Routes>
  );
}

export default App;