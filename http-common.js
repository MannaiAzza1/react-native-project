import axios from "axios";
export default axios.create({
  baseURL: "http://172.16.13.197:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});