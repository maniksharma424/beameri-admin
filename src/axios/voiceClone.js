import axios from "axios";
import { Axios } from "./axios";

export const createVoiceClone = async ({ ...data }) => {
  return await Axios.post("/api/elevenlabs/add", data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const getAllVoice = async () => {
  return await axios.get("https://api.elevenlabs.io/v1/voices", {
    headers: {
      accept: "application/json",
      "xi-api-key": "ccafda7fd0911b18cb4ec7bd6486b14b",
    },
  });
};
export const getAllVoiceDb = async () => {
  return await Axios.get("/api/elevenlabs/active-voice", {
    headers: {
      accept: "application/json",
    },
  });
};

export const deleteSingleVoiceId = async (voiceId) => {
  return await axios.delete(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
    headers: {
      accept: "application/json",
      "xi-api-key": "ccafda7fd0911b18cb4ec7bd6486b14b",
    },
  });
};

export const deleteSingleVoiceDbId = async (voiceId) => {
  return await Axios.delete(`/api/elevenlabs/active-voice-delete/${voiceId}`, {
    headers: {
      accept: "application/json",
    },
  });
};
export const updateStatusVoiceDbId = async (voiceId) => {
  return await Axios.put(`/api/elevenlabs/active-voice-update/${voiceId}`, {
    headers: {
      accept: "application/json",
    },
  });
};
