import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000,
  headers:{
    "Content-Type": "application/json",
  },
});