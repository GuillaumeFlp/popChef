import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Fab, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
  ];

  useEffect(() => {
    fetch("http://localhost:3002/products", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        setProducts(jsonResponse);
      })
      .catch((error) => console.error(error));
  }, [selectedProducts]);

  return (
    <div>
      <div style={{ marginTop: 50, height: 400, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            // If the selection is empty it is a reset of the selection
            if (selectedProducts.length < 1 || newSelectionModel.length === 0) {
              setSelectedProducts(newSelectionModel);
            }
          }}
          selectionModel={selectedProducts}
        />
        <Link to="">
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "fixed", right: 20, bottom: 20 }}
          >
            <Add />
          </Fab>
        </Link>
      </div>

      <Button sx={{ m: 2 }} color="primary" variant="contained" disabled={!selectedProducts.length}>
        View
      </Button>

      <Button sx={{ m: 2 }} color="warning" variant="contained" disabled={!selectedProducts.length}>
        Edit
      </Button>

      <Button sx={{ m: 2 }} color="error" variant="contained" disabled={!selectedProducts.length}>
        Delete
      </Button>
    </div>
  );
}

export default Home;
