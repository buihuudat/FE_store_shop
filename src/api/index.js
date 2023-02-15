import axiosClient from "./axiosClient";

export const AuthApi = {
  login: (payload) => axiosClient.post("/auth/login", payload),
  register: (payload) => axiosClient.post("/auth/register", payload),
  logout: () => axiosClient.post("/auth/logout"),
  getUser: () => axiosClient.get("/auth/get-user"),
  changeAvatar: (payload) =>
    axiosClient.post(`/auth/${payload.id}/change-avatar`, payload.avatar),
};
