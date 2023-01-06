import http from "../http-common";
import Axios from "axios"
const getAll = () => {
  return http.get("/player");
};
const get = id => {
  return http.get(`/player/${id}`);
};
const update = (id, data) => {
  return http.put(`/player/${id}/update`, data);
};
const remove = id => {
  return http.delete(`/player/${id}/delete`);
};
const removeAll = () => {
  return http.delete(`/player`);
};
const FindVisible = () => {
    return http.get(`/player/visible`);
  };
  export const fetchPlayer = async (id) => {
    const result = await Axios.get(`http://localhost:8080/api/player/${id}`)
    return result.data
  }
  export const fetchPlayers = async () => {
    const result = await Axios.get(`http://localhost:8080/api/player/`)
    return result.data
  }

const PlayerService = {
  getAll,
  get,
  update,
  remove,
  removeAll,
  FindVisible,
  fetchPlayer,
  fetchPlayers,

  
};
export default PlayerService;