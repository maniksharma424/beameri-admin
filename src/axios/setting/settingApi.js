import { isAutheticated } from "../../utils/auth";
import { Axios } from "../axios";

const { token } = isAutheticated();

// company
export const getCompany = async () => {
  return await Axios.get("/api/settings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createAboutCompany = async ({ ...data }) => {
  return await Axios.post("/api/settings/about", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// application name
export const applicationName = async ({ ...data }) => {
  return await Axios.post("/api/settings/app-name", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// company adddress
export const compayAddress = async ({ ...data }) => {
  return await Axios.post("/api/settings/address", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// company social media
export const compantSocialMedia = async ({ ...data }) => {
  return await Axios.post("/api/settings/social", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// company Logo
export const companyLogo = async ({ ...data }) => {
  console.log("company logo", data);
  return await Axios.post("/api/settings/logo", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// user roles
export const getUserPermission = async ({ ...data }) => {
  return await Axios.post("/user", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
