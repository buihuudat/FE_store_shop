import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BG } from "../assets";
import MenuHome from "../components/MenuHome";
import axios from "axios";
import { DATA_FAKE } from "../api/axiosClient";
import Product from "../components/Product";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("men's clothing");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${DATA_FAKE}/category/${type}`);
        setProducts(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    getProducts();
  }, [type]);

  return (
    <Box sx={{ ml: 4, mr: 4 }}>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          background: `url(${BG}) center no-repeat`,
          backgroundSize: "cover",
          borderRadius: "30px",
          padding: 3,
          paddingTop: 5,
        }}
      >
        <Typography color="white" variant="h2" fontWeight={500}>
          Lựa chọn tinh ý <br /> Sản phẩm tuyệt vời
        </Typography>

        <Typography color="white" variant="h5" mt={4}>
          Thanh toán nhanh chóng <br /> giao hàng tận nơi
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <MenuHome type={type} setType={setType} />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            gap: 5,
          }}
        >
          {products &&
            products?.map((product, i) => (
              <Product key={i} product={product} />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
