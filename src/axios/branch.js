import { isAutheticated } from "../utils/auth";
import { Axios } from "./axios";

const { token } = isAutheticated();

export const getBranch = async () => {
  return await Axios.get("/api/branch/get-all-branches", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllMembersToBranch = async (id) => {
  return await Axios.get(`/api/member/get-members/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getBranchSingle = async (id) => {
  return await Axios.get(`/api/branch/get-branch/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createBranch = async ({ ...data }) => {
  return await Axios.post("/api/branch/add-branch", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editBranch = async ({ id, ...rest }) => {
  return await Axios.put(`/api/branch/update-branch/${id}`, rest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBranch = async (id) => {
  return await Axios.delete(`/api/branch/delete-branch/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
