import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getQuestion = () => API.get("/question");

export default API;