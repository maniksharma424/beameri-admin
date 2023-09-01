import { isAutheticated } from "../utils/auth";
import { Axios } from "./axios";

const { token } = isAutheticated();

export const getAllMembers = async (id) => {
  return await Axios.get("/api/member/get-all-members", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
