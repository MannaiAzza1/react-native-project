/* eslint-disable no-unused-vars */
import axios from "axios";
const create = (data) => {
    return axios.post("http://127.0.0.1:8080/program/add", data);
};

const getAll = async () => {
    const result = await axios.get("http://127.0.0.1:8080/program/get");
    return result;
};

const getProgram = (id) => {
    return axios.get("http://127.0.0.1:8080/program/get/" + id);
};

const updateProgram = (id, data) => {
    return axios.put("http://127.0.0.1:8080/program/update/" + id, data);
};

const remove = (id) => {
    return axios.delete("http://127.0.0.1:8080/program/delete/" + id);
};

const ProgramService = {
    create,
    getAll,
    getProgram,
    updateProgram,
    remove,
};
export default ProgramService;
