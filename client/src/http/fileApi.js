import { $authHost } from "./index";

export const fetchFile = async () => {
  const { data } = await $authHost.get("api/v1/files");
  return data;
};

export const fetchFileOne = async (id) => {
  const { data } = await $authHost.get("api/v1/files/" + id);
  return data;
};

export const createRecognitions = async (file) => {
  const { data } = await $authHost.post("api/v1/recognitions/", {
    file,
  });
  return data;
};

export const fetchRecognitions = async () => {
  const { data } = await $authHost.get("/api/v1/recognitions/");
  return data;
};

export const fetchRecognitionsOne = async (id) => {
  const { data } = await $authHost.get("/api/v1/recognitions/" + id);
  return data;
};
