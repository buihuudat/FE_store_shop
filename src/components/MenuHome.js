import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import MenuSort from "./MenuSort";

const MenuHome = ({ type, setType }) => {
  const menus = [
    {
      name: "Đồ nam",
      type: "men's clothing",
    },
    {
      name: "Đồ nữ",
      type: "women's clothing",
    },
    {
      name: "Đồ công nghệ",
      type: "electronics",
    },
    {
      name: "Đồ kim hoàn",
      type: "jewelery",
    },
  ];
  return (
    <Container
      sx={{
        textAlign: "center",
      }}
    >
      <Box>
        {menus.map((e, i) => (
          <Button
            key={i}
            sx={type === e.type && { background: "#eee", color: "blue" }}
            onClick={() => setType(e.type)}
            color="inherit"
          >
            {e.name}
          </Button>
        ))}
      </Box>
      <Box sx={{ width: "max-content" }}>
        <MenuSort />
      </Box>
    </Container>
  );
};

export default MenuHome;
