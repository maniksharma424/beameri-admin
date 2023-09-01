import { isAutheticated } from "../../utils/auth";
import { Axios } from "../axios";

const { token } = isAutheticated();

export const createUserByAdmin = async ({ ...data }) => {
  return await Axios.post("/user/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
