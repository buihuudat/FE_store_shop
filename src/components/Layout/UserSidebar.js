import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Link, ListItem, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const dataSidebar = [
  {
    text: "User Info",
    icon: <AccountCircleIcon />,
    path: "/tai-khoan",
  },
  {
    text: "Cart",
    icon: <ShoppingCartIcon />,
    path: "/gio-hang",
  },
  {
    text: "Favorites",
    icon: <FavoriteIcon />,
    path: "/yeu-thich",
  },
  {
    text: "Settings",
    icon: <SettingsApplicationsIcon />,
    path: "cai-dat",
  },
  {
    text: "Notications",
    icon: <CircleNotificationsIcon />,
    path: "/thong-bao",
  },
  {
    text: "Support",
    icon: <SupportAgentIcon />,
    path: "/ho-tro",
  },
];

export default function UserSidebar() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          zIndex: -1,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {dataSidebar.map((data, i) => (
            <ListItem key={i}>
              <Box
                component={Link}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  cursor: "pointer",
                  width: "100%",
                  p: 1,
                  color: "black",
                  textDecoration: "none",
                  borderRadius: "10px",
                  borderBottom: `${
                    pathname === data.path
                      ? "3px solid skyblue"
                      : "1px solid #333"
                  }`,
                }}
                href={data.path}
              >
                <Typography p={1}>{data.icon}</Typography>
                <Typography fontSize={20}>{data.text}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
