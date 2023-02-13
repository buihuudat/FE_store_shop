import axios from "axios";

const baseURL = "http://localhost:8000/api";
export const DATA_FAKE = "https://fakestoreapi.com/products";

const axiosClient = axios.create({
  baseURL,
});

const getToken = () => localStorage.getItem("token");

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  };
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
