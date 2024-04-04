import axios from "axios";

const client = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const token = localStorage.getItem("token");
client.defaults.headers.common["Authorization"] = token;

export default client;
