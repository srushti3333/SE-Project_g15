import axios from 'axios';

// Axios instance for all API calls
const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: intercept requests/responses for logging, auth tokens
api.interceptors.request.use(
    config => {
        // Example: add auth token if available
        // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

export default api;
