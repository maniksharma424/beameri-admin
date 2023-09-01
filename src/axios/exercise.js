import { isAutheticated } from "../utils/auth";
import { Axios } from "./axios";

const { token } = isAutheticated();

export const getExercise = async () => {
  return await Axios.get("/api/exercise/get-exercises", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getExerciseSingle = async (id) => {
  return await Axios.get(`/api/exercise/get-exercise/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createExercise = async ({ ...data }) => {
  console.log("data img", data);
  return await Axios.post("/api/exercise/add-exercise", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editExercise = async ({ id, ...rest }) => {
  return await Axios.put(`/api/exercise/update-exercise/${id}`, rest, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteExercise = async (id) => {
  return await Axios.delete(`/api/exercise/delete-exercise/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
