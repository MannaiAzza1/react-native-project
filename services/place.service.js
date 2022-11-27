import http from "../http-common";
import Axios from "axios";
const getAll = ()  => {
    return http.get("/place");
    
};
const fetchPlaces = async () => {
    // await delay(500)
    const result = await Axios.get("http://192.168.1.16/api/place");
    return result.data;

}
const get = (id) => {
    return http.get(`/place/${id}`);
};
const create = (data) => {
    return http.post("/place/create", data);
};
const update = (id, data) => {
    return http.put(`/place/${id}/update`, data);
};
const remove = (id) => {
    return http.delete(`/place/${id}/delete`);
};
const removeAll = () => {
    return http.delete(`/place`);
};

const PlaceService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    fetchPlaces,
};
export default PlaceService;