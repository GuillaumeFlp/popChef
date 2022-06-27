import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";

import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Typography variant="h3" component="div" align="center" gutterBottom>
        Popchef test
      </Typography>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
