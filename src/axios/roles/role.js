import { isAutheticated } from "../../utils/auth";
import { Axios } from "../axios";

const { token } = isAutheticated();

export const updateRole = async ({ id, ...rest }) => {
  return await Axios.put(`/user/role/${id}`, rest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
