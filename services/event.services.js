import axios from "axios";
const create = (data) => {
  return axios.post("http://127.0.0.1:8080/event/add", data);
};

const getAll = () => {
  return axios.get("http://127.0.0.1:8080/event/get");
};

const getEvent = (id) => {
  return axios.get("http://127.0.0.1:8080/event/get/" + id);
};

const updateEvent = (id, data) => {
  return axios.put("http://127.0.0.1:8080/event/update/" + id, data);
};
const remove = (id) => {
  return axios.delete("http://127.0.0.1:8080/event/delete/" + id);
};

const EventService = {
  create,
  getAll,
  getEvent,
  updateEvent,
  remove,
};
export default EventService;
