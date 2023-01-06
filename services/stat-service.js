import http from "../http-common";
import Axios from "axios";

const getAll = async () => {
  const result = await Axios.get("http://192.168.1.7:8080/api/stat");
  return result.data;
};

const get = (id) => {
  return http.get(`/stat/${id}`);
};
const create = (data) => {
  return http.post("/stat/create", data);
};
const update = (id, data) => {
  return http.put(`/stat/${id}/update`, data);
};
const remove = (id) => {
  return http.delete(`/stat/${id}/delete`);
};
const removeAll = () => {
  return http.delete(`/stat`);
};
const FindVisible = () => {
  return http.get(`/stat/visible`);
};

export const FetchVisibleStats = async () => {
  // await delay(500)
  const result = await Axios.get("http://192.168.1.7:8080/api/stat/visible");
  return result.data;
};

const StatService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  FindVisible,
  FetchVisibleStats,
};
export default StatService;
