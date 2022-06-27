import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TextField, Button, Alert, Collapse } from "@mui/material";

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescrption] = useState("");
  const [price, setPrice] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);

  const goHome = () => {
    navigate("/");
  };

  const handleClickAddProduct = () => {
    const body = { name, description, price };

    fetch("http://localhost:3002/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 201) {
          goHome();
        } else {
          setAlertOpen(true);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Collapse in={alertOpen}>
        <Alert severity="error">Error alert</Alert>
      </Collapse>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name-input"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          id="description-input"
          label="Description"
          variant="outlined"
          multiline
          maxRows={4}
          value={description}
          onChange={(event) => setDescrption(event.target.value)}
        />
        <TextField
          id="price-input"
          label="Price"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          variant="outlined"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <Button variant="contained" onClick={handleClickAddProduct}>
          Add
        </Button>
      </Box>

      <Button variant="contained" onClick={goHome}>
        Home
      </Button>
    </div>
  );
}

export default AddProduct;
