import axios from 'axios';

import { API_BASE_URL } from "../utils/constants";
// Axios instance for all API calls
const api = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: intercept requests/responses for logging, auth tokens
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
