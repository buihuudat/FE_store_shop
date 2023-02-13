import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const CartItem = ({ cart, handleDeleteCartItem }) => {
  const [count, setCount] = useState(cart?.count);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleRemove = () => {
    setCount(count === 1 ? 1 : count - 1);
  };

  return (
    <div>
      <Paper>
        <Box
          display={"flex"}
          flexDirection="row"
          gap={2}
          justifyContent="space-between"
          mt={3}
        >
          <Avatar
            src={cart.image}
            variant="square"
            sx={{ height: "100%", width: 60 }}
          />
          <Box>
            <Box
              display={"flex"}
              flexDirection="row"
              justifyContent={"space-between"}
              gap={3}
              alignItems="center"
            >
              <Typography>
                {cart?.title?.length > 25
                  ? cart?.title?.slice(0, 25) + "..."
                  : cart?.title}
              </Typography>
              <Typography fontSize={18} color={"orange"}>
                {cart.price}$
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              justifyContent="center"
            >
              <IconButton onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              <TextField
                size="small"
                value={count}
                sx={{ color: "#000", outline: 1, width: 50 }}
              />
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Box>
            <Typography fontWeight={500} fontSize={18}>
              Tổng: {Math.round(cart.price * count * 100) / 100}$
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteCartItem(cart)}
          >
            X
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default CartItem;
