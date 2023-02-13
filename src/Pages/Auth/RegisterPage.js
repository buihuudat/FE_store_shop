import React, { useState } from "react";
import { Box, IconButton, Link, TextField, Typography } from "@mui/material";
import { BG_REGISTER } from "../../assets";
import { LoadingButton } from "@mui/lab";
import { ToastHandlers } from "../../handlers/ToastHandlers";
import { AuthApi } from "../../api";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { setUserData } from "../../reducers/userReducer";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [firstnameErrText, setFirstnameErrText] = useState(0);
  const [lastnameErrText, setLastnameErrText] = useState(0);
  const [phoneErrText, setPhoneErrText] = useState("");
  const [emailErrText, setEmailErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("firstName") + " " + formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("confirmPassword"),
    };

    let err = false;

    if (formData.get("firstName") === "") {
      setFirstnameErrText(1);
      err = true;
    }
    if (formData.get("lastName") === "") {
      setLastnameErrText(1);
      err = true;
    }
    if (data.phone === "") {
      setPhoneErrText("Bạn chưa nhập số điện thoại");
      err = true;
    }
    if (data.email === "") {
      setEmailErrText("Bạn chưa nhập email");
      err = true;
    }

    if (data.password === "") {
      setPasswordErrText("Bạn chưa nhập mật khẩu");
      err = true;
    }
    if (data.password.length < 6) {
      setPasswordErrText("Mật khẩu yêu cầu tối thiểu 6 kí tự");
      err = true;
    }
    if (data.password !== formData.get("confirmPassword")) {
      setConfirmPasswordErrText("Mật khẩu không khớp");
      err = true;
    }

    if (err) return;

    setLoading(true);
    setPhoneErrText("");
    setPasswordErrText("");

    try {
      const { user, access_token } = await AuthApi.register(data);
      dispatch(setUserData(user));
      localStorage.setItem("token", access_token);
      setLoading(false);
      ToastHandlers("success", "Đăng ký thành công");
      navigate("/");
    } catch (e) {
      ToastHandlers("error", e.message);
    }
  };

  return (
    <Box
      sx={{
        background: `url(${BG_REGISTER})`,
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "900px",
          minHeight: "600px",
          backdropFilter: "blur(100px)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          border: 1,
          p: 3,
        }}
      >
        <Box>
          <IconButton onClick={() => navigate("/")}>
            <HomeIcon color="primary" />
          </IconButton>
        </Box>
        <Typography fontWeight={500} fontSize={60}>
          BHD&Tv
        </Typography>
        <Typography fontWeight={400}>Đăng ký tài khoản ngay</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            m: "0 auto",
            display: "flex",
            flexDirection: "column",
            padding: 5,
            width: 500,
          }}
        >
          <Box display={"flex"} gap={3}>
            <TextField
              name={"firstName"}
              variant="filled"
              label={"Họ"}
              error={firstnameErrText}
            />
            <TextField
              name={"lastName"}
              variant="filled"
              label={"Tên"}
              error={lastnameErrText}
            />
          </Box>
          <TextField
            label="Số điện thoại"
            name="phone"
            margin="normal"
            variant="filled"
            required
            error={phoneErrText !== ""}
            helperText={phoneErrText}
          />
          <TextField
            label="Email"
            required
            type={"email"}
            name="email"
            margin="normal"
            variant="filled"
            error={emailErrText !== ""}
            helperText={emailErrText}
          />
          <TextField
            label="Mật khẩu"
            name="password"
            margin="normal"
            type={"password"}
            variant="filled"
            error={passwordErrText !== ""}
            helperText={passwordErrText}
          />

          <TextField
            label="Xác minh mật khẩu"
            name="confirmPassword"
            margin="normal"
            type={"password"}
            variant="filled"
            error={confirmPasswordErrText !== ""}
            helperText={confirmPasswordErrText}
          />
          <LoadingButton
            loading={loading}
            variant="outlined"
            sx={{ mt: 2 }}
            type="submit"
          >
            Đăng ký
          </LoadingButton>
        </Box>
        <Typography>
          Đã có tài khoản? <Link href="dang-nhap">Đăng nhập ngay</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
