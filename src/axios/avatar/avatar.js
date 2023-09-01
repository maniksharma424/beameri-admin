import { isAutheticated } from "../../utils/auth";
import { Axios } from "../axios";

const { token } = isAutheticated();

export const createAvatar = async ({ ...rest }) => {
  return await Axios.post("/api/avatar", rest, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
export const activeAvatar = async () => {
  return await Axios.get("/api/avatar/active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllAvatar = async () => {
  return await Axios.get("/api/avatar", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAvatarSingle = async (id) => {
  return await Axios.get(`/api/avatar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStatusAvatar = async (id) => {
  return await Axios.put(
    `/api/avatar/status/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const editAvatar = async ({ id, ...rest }) => {
  return await Axios.put(`/api/avatar/${id}`, rest, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAvatar = async (id) => {
  return await Axios.delete(`/api/avatar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
