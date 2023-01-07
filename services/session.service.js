/* eslint-disable no-unused-vars */
import Axios from "axios";

const create = (data) => {
  console.log("axios", data);
  return Axios.post("http://192.168.1.7:8080/session/add", data);
};
export const fetchSessionById = async (id) => {
  const result = await Axios.get("http://192.168.1.7:8080/session/" + id);
  return result.data.model;
};

const getAll = () => {
  return Axios.get("http://192.168.1.7:8080/session/get/all");
};

const get = (id) => {
  return Axios.get("http://192.168.1.7:8080/session/" + id);
};

const updateCancel = (id, data) => {
  return Axios.put("http://192.168.1.7:8080/session/" + id + "/cancel", data);
};

const updateFeedback = (id, data) => {
  return Axios.put("http://192.168.1.7:8080/session/" + id + "/feedback", data);
};
const update = (id, data) => {
  return Axios.put("http://192.168.1.7:8080/session/" + id + "/update", data);
};

const SessionService = {
  create,
  getAll,
  get,
  update,
  updateCancel,
  updateFeedback,
  fetchSessionById,
};
export default SessionService;
