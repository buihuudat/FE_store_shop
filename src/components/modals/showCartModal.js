import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAddCart, setShowCart } from "../../reducers/cartReducer";
import CartItem from "../CartItem";
import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  minWidth: 400,
  p: 4,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};

export default function ShowCartModal() {
  const open = useSelector((state) => state.cart.status);
  const carts = useSelector((state) => state.cart.carts);
  const user = useSelector((state) => state.user.userData);

  const [voucher, setVoucher] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [voucherErrText, setVoucherErrText] = React.useState("");
  const [discount, setDiscount] = React.useState(null);
  const [loadingPay, setLoadingPay] = React.useState(false);
  const [userAddress, setUserAddress] = React.useState(user?.address);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(setShowCart(false));
    setLoading(false);
    setVoucher("");
    setVoucherErrText("");
  };

  const handleDeleteCartItem = (cart) => {
    dispatch(setAddCart(carts.filter((e) => e.id !== cart.id)));
  };

  const handleAddVoucher = async () => {
    if (voucher === "") {
      setVoucherErrText("Bạn chưa nhập mã giảm giá");
      return;
    }
    setLoading(true);
    setVoucherErrText("");
  };

  const sumPrice = carts.reduce((cart, prj) => cart + prj.price, 0);

  const handlePay = () => {};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {carts?.length <= 0 ? (
            <Box>
              <Typography variant="h5" fontWeight={500}>
                Giỏ hàng trống
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography fontSize={26} fontWeight={500} mb={4}>
                Giỏ hàng
              </Typography>
              <Box maxHeight={300} overflow="auto" p={1}>
                {carts.map((cart, i) => (
                  <CartItem
                    key={i}
                    cart={cart}
                    handleDeleteCartItem={handleDeleteCartItem}
                  />
                ))}
              </Box>
              <Paper sx={{ mt: 3, p: 2 }}>
                <Box
                  display={"flex"}
                  flexDirection="row"
                  justifyContent={"space-around"}
                >
                  <TextField
                    label="Thêm mã giảm giá"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    error={voucherErrText !== ""}
                    helperText={voucherErrText}
                  />
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={handleAddVoucher}
                  >
                    Áp dụng
                  </LoadingButton>
                </Box>
                {discount && (
                  <Box display={"flex"} mt={1} gap={1} alignItems={"center"}>
                    <Typography>Bạn được giảm: </Typography>
                    <Typography color={"orange"} fontSize={22} fontWeight={500}>
                      {discount} %
                    </Typography>
                  </Box>
                )}

                <Box
                  mt={3}
                  display={"flex"}
                  gap={1}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <TextField
                    disabled={true}
                    defaultValue={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    label="Địa chỉ nhận hàng"
                    fullWidth
                  />

                  {user?.address ? (
                    <Button variant="contained" color="warning">
                      Chỉnh sửa
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => navigate("/tai-khoan")}
                        variant="contained"
                      >
                        Thêm
                      </Button>
                    </>
                  )}
                </Box>

                <Box mt={3}>
                  <Typography fontWeight={500} fontSize={20}>
                    <Divider>Thanh toán {sumPrice} $</Divider>
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  flexDirection="row"
                  mt={1}
                  justifyContent={"center"}
                  gap={3}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                  >
                    Hủy
                  </Button>
                  <LoadingButton
                    loading={loadingPay}
                    fullWidth
                    variant="outlined"
                    color="success"
                    onClick={handlePay}
                  >
                    Thanh toán
                  </LoadingButton>
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}
