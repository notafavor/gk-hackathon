import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const fetchFileUser = async () => {
  const { data } = await $authHost.get("api/v1/files");
  return data;
};
