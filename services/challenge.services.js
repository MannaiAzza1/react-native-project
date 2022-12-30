import http from "../http-common";
const getAll = () => {
    return http.get("/challenge");
};
const get = (id) => {
    return http.get(`/challenge/${id}`);
};
const create = (data) => {
    return http.post("/challenge/create", data);
};
const update = (id, data) => {
    return http.put(`/challenge/${id}/update`, data);
};
const remove = (id) => {
    return http.delete(`/challenge/${id}/delete`);
};

const assign = (id, data) => {
    return http.put(`/challenge/${id}/assign`,data);
};
const removeAll = () => {
    return http.delete(`/challenge`);
};
const FindVisible = () => {
    return http.get(`/challenge/visible`);
};

const ChallengeService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    FindVisible,
    assign,
};
export default ChallengeService;
