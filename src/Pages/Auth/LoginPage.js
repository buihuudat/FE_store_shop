import React, { useState } from "react";
import { Box, IconButton, Link, TextField, Typography } from "@mui/material";
import { BG_LOGIN } from "../../assets";
import { LoadingButton } from "@mui/lab";
import { ToastHandlers } from "../../handlers/ToastHandlers";
import { AuthApi } from "../../api";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { setUserData } from "../../reducers/userReducer";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [phoneErrText, setPhoneErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    let err = false;

    if (data.phone === "") {
      setPhoneErrText("Bạn chưa nhập số điện thoại");
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

    if (err) return;

    setLoading(true);
    setPhoneErrText("");
    setPasswordErrText("");

    try {
      const user = await AuthApi.login(data);
      localStorage.setItem("token", user.access_token);
      dispatch(setUserData(user.user));
      setLoading(false);
      ToastHandlers("success", "Đăng nhập thành công");
      navigate("/");
    } catch (e) {
      ToastHandlers("error", e.data.error);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: `url(${BG_LOGIN})`,
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
          height: "600px",
          backdropFilter: "blur(100px)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          border: 1,
        }}
      >
        <Box>
          <IconButton onClick={() => navigate("/")}>
            <HomeIcon color="success" />
          </IconButton>
        </Box>
        <Typography fontWeight={500} fontSize={60}>
          BHD&Tv
        </Typography>
        <Typography fontWeight={400}>Đăng nhập tài khoản của bạn</Typography>
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
          <TextField
            label="Số điện thoại"
            required
            name="phone"
            margin="normal"
            variant="filled"
            error={phoneErrText !== ""}
            helperText={phoneErrText}
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
          <LoadingButton
            loading={loading}
            variant="outlined"
            sx={{ mt: 2 }}
            type="submit"
          >
            Đăng nhập
          </LoadingButton>
        </Box>
        <Typography>
          Bạn chưa có tài khoản? <Link href="dang-ky">Đăng ký ngay</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
