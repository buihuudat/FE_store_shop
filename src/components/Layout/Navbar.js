import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart } from "../../reducers/cartReducer";
import { AuthApi } from "../../api";
import { setUserData } from "../../reducers/userReducer";

const LinkBar = [
  { name: "Trang chủ", path: "/" },
  { name: "Sản phẩm", path: "san-pham" },
  { name: "Tin Tức", path: "tin-tuc" },
  { name: "Giới thiệu", path: "gioi-thieu" },
  { name: "Hỗ trợ", path: "ho-tro" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null | (HTMLElement > null));
  const { pathname } = useLocation();
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userData);
  const carts = useSelector((state) => state.cart.carts);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowCart = () => {
    dispatch(setShowCart(true));
  };

  const handleLogin = () => {
    navigate("/dang-nhap");
  };

  const handleLogout = async () => {
    try {
      await AuthApi.logout();
      localStorage.removeItem("token");
      dispatch(setUserData());
      navigate("/");
    } catch (e) {
      console.log(e);
      // ToastHandlers(e)
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Box sx={{ fontSize: "2rem", fontWeight: 600, width: "10%" }}>
        <Link underline="none" color={"black"} href="/">
          BHD&Tv
        </Link>
      </Box>
      <Box sx={{ display: "flex", gap: 3, fontWeight: 500 }}>
        {LinkBar.map((e, i) => (
          <Link
            key={i}
            underline="none"
            color={
              pathname === e.path || pathname.split("/")[1] === e.path
                ? "blue"
                : "black"
            }
            href={e.path}
          >
            {e.name}
          </Link>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          width: "10%",
        }}
      >
        <Tooltip title="Search" color="primary">
          <IconButton>
            <SearchIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Search" color="primary">
          <IconButton onClick={handleShowCart}>
            <Badge badgeContent={carts.length} color="primary">
              <ShoppingBagIcon color="primary" />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Search" color="primary">
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar src={user?.avatar} />
          </IconButton>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {user?.id && (
            <MenuItem onClick={handleClose}>
              <Link sx={{ color: "inherit" }} underline="none" href="tai-khoan">
                Tài khoản
              </Link>
            </MenuItem>
          )}
          {user?.id && <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>}
          {!user?.id && <MenuItem onClick={handleLogin}>Đăng nhập</MenuItem>}
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
