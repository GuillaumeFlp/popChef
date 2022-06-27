import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ShowProduct from "./pages/ShowProduct";

function App() {
  return (
    <div className="App">
      <Typography variant="h3" component="div" align="center" gutterBottom>
        Popchef test
      </Typography>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/showProduct/:id" element={<ShowProduct />} />
      </Routes>
    </div>
  );
}

export default App;
