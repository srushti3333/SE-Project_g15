import api from './axios';

// Login API
export const loginUser = (username, password) => {
    return api.post('/login', { username, password }); // Dummy endpoint
};

// Signup API
export const signupUser = (username, email, password) => {
    return api.post('/signup', { username, email, password }); // Dummy endpoint
};


