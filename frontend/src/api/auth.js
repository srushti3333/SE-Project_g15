// frontend/src/api/auth.js
import API from "./axios";

// Signup: backend expects { name, email, password }
export const signupUser = async (username, email, password) => {
  try {
    const response = await API.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};


// Login: backend expects { email, password }
export const loginUser = async (username, password) => {
  try {
    // send exactly username and password (not email)
    const response = await API.post("/auth/login", { username, password });

    // Save token if present
    if (response?.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    // throw the server's error object so frontend can use it
    const err = error.response?.data || { message: error.message };
    throw err;
  }
};




