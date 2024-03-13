import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (username, email, password) => {
  const { data } = await $host.post("api/v1/register/", {
    username,
    email,
    password,
  });
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  return jwtDecode(data.access);
};

export const login = async (username, password) => {
  const { data } = await $host.post("api/v1/auth/", {
    username,
    password,
  });
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  return jwtDecode(data.access);
};

export const refreshToken = async () => {
  const { data } = await $host.post("api/v1/token/refresh/", {
    refresh: localStorage.getItem("refreshToken"),
  });
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  return jwtDecode(data.access);
};

export const logOut = async () => {
  const { data } = await $authHost.post("api/v1/logout/", {
    refresh: localStorage.getItem("refreshToken"),
  });
  localStorage.removeItem("accessToken", data.access);
  localStorage.removeItem("refreshToken", data.refresh);
};
