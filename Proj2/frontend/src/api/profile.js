import API from "./axios";

export const fetchProfile = async () => {
  const response = await API.get("/profile");
  return response.data;
};

export const updateProfile = async (profileData, config = {}) => {
  const response = await API.put("/profile", profileData, config);
  return response.data;
};


