import { isAutheticated } from "../../utils/auth";
import { Axios } from "../axios";

const { token } = isAutheticated();

export const dashboad = async () => {
  return await Axios.get(`/user/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
