import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

function ShowProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

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
          setProduct(jsonResponse);
        } else {
          goHome();
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div align="center">
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Name : {product && product.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Description : {product && product.description}
          </Typography>
          <Typography variant="body2">Price : {product && product.price} €</Typography>
        </CardContent>
      </Card>

      <Button sx={{ m: 2 }} variant="contained" onClick={goHome}>
        Home
      </Button>
    </div>
  );
}

export default ShowProduct;
