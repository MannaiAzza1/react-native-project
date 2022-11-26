import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

const register = (data) => {
    return axios.post("http://127.0.0.1:8080/api/auth/signup/coach", data);
};
const invite = (id, username, email, password, firstname, lastname) => {
    return axios.post(API_URL + id + "/invite", {
        username,
        email,
        password,
        firstname,
        lastname,
    });
};
const getinvites = (id, data) => {
    return axios.get(`http://localhost:8080/api/player/coach/` + id, data);
};
const acceptInvite = (id, data) => {
    return axios.put(`http://127.0.0.1:8080/api/auth/confirm/${id}`, data);
  };

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};
const logout = () => {
    localStorage.removeItem("user");
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    invite,
    getinvites,
    acceptInvite
};
export default AuthService;