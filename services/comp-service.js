import http from "../http-common";
import  Axios  from "axios";

const getAll = () => {
  return http.get("/comp");
};
const get = id => {
  return http.get(`/comp/${id}` );
};
export const FetchCompetences = async () => {
  
  // await delay(500)
  const result = await Axios.get("http://192.168.1.6:8080/api/comp/")
  return result.data
}
export const FetchVisibleCompetences = async () => {
  // await delay(500)
  const result = await Axios.get("http://192.168.1.6:8080/api/comp/visible")
  return result.data
}
const create = data => {
  return http.post("/comp/create", data);
};
const update = (id, data) => {
  return http.put(`/comp/${id}/update`, data);
};
const remove = id => {
  return http.delete(`/comp/${id}/delete`);
};
const removeAll = () => {
  return http.delete(`/comp`);
};
const FindVisible = () => {
    return http.get(`/comp/visible` );
  };

const CompetenceService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  FindVisible,
  FetchCompetences,
  FetchVisibleCompetences
  
};
export default CompetenceService;