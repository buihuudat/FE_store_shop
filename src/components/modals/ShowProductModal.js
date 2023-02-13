import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowProduct } from "../../reducers/modalReducer";
import { Avatar, Button, IconButton, Rating, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { setAddCart } from "../../reducers/cartReducer";
import { ToastHandlers } from "../../handlers/ToastHandlers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "row",
  gap: 4,
  minWidth: "60%",
  minHeight: "60%",
};

export default function ShowProductModal() {
  const { open, product } = useSelector((state) => state.modal.showProduct);
  const [count, setCount] = React.useState(1);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);

  const handleClose = () => {
    dispatch(
      setShowProduct({
        open: false,
        product: {},
      })
    );
  };

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleRemove = () => {
    setCount(count === 1 ? 1 : count - 1);
  };

  const handleAddCart = () => {
    if (carts.some((cart) => cart.id === product.id)) {
      ToastHandlers("warning", "Sản phẩm đã có trong giỏ hàng");
      return;
    }
    dispatch(setAddCart([...carts, { ...product, count }]));
    dispatch(
      setShowProduct({
        open: false,
        product: {},
      })
    );
    ToastHandlers("success", "Sản phẩm đã được thêm vào giỏ hàng");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Avatar
              src={product.image}
              sx={{ width: 400, height: "auto" }}
              variant={"square"}
            />
          </Box>
          <Box width={"100%"} display="flex" flexDirection={"column"} gap={5}>
            <Box bgcolor={"orange"}>
              <Typography
                align="center"
                color={"white"}
                fontWeight={500}
                fontSize={20}
              >
                Thông tin sản phẩm
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Typography fontSize={30}>{product.title}</Typography>
              <Typography fontSize={35} color="orange">
                {product.price}$
              </Typography>
            </Box>

            <Box display={"flex"} flexDirection="row">
              <Rating value={product?.rating?.rate} readOnly />
              <Typography>({product?.rating?.count})</Typography>
            </Box>
            <Typography>{product.description}</Typography>

            <Box display={"flex"} flexDirection={"row"} justifyContent="center">
              <IconButton onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              <TextField value={count} sx={{ color: "#000", outline: 1 }} />
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={handleAddCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
