import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Alert, Collapse, TextField, Box } from "@mui/material";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescrption] = useState("");
  const [price, setPrice] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch(`http://localhost:3002/products/${id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse) {
          setName(jsonResponse.name);
          setDescrption(jsonResponse.description);
          setPrice(jsonResponse.price);
        } else {
          goHome();
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleClickEditProduct = () => {
    const body = { name, description, price };
    fetch(`http://localhost:3002/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
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
      </Box>

      <Button variant="contained" onClick={goHome}>
        Home
      </Button>

      <Button variant="contained" onClick={handleClickEditProduct}>
        Valid
      </Button>
    </div>
  );
}

export default EditProduct;
