import { Avatar, CardActionArea, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { setShowProduct } from "../reducers/modalReducer";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleSelect = () => {
    dispatch(
      setShowProduct({
        open: true,
        product,
      })
    );
  };

  return (
    <Box>
      <CardActionArea
        onClick={handleSelect}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 300,
        }}
      >
        <Avatar
          src={product.image}
          variant="square"
          sx={{ width: 100, height: "auto" }}
        />
        <Typography fontWeight={500} fontSize={24}>
          {product.title.length > 10 && `${product.title.slice(0, 10)}...`}
        </Typography>
        <Box display={"flex"} flexDirection="row">
          <Rating value={product.rating.rate} readOnly />
          <Typography>({product.rating.count})</Typography>
        </Box>
        <Typography fontSize={18} color="orange">
          {product.price} $
        </Typography>
      </CardActionArea>
    </Box>
  );
};

export default Product;
