import api from './axios';

// Get all groups (for Find Groups page)
export const getAllGroups = async () => {
  const response = await api.get('/groups');
  return response.data;
};

// // Get user's groups
// export const getUserGroups = async (username = 'Alice') => {
//   const response = await api.get(`/groups/my-groups?username=${username}`);
//   return response.data;
// };

// Get user's groups
export const getUserGroups = async () => {
  const response = await api.get(`/groups/my-groups`);
  return response.data;
};

// Get specific group details
export const getGroupDetails = async (groupId) => {
  const response = await api.get(`/groups/${groupId}`);
  return response.data;
};

// Create a new group
export const createGroup = async (groupData) => {
  const response = await api.post('/groups', groupData);
  return response.data;
};

// Update group details
export const updateGroup = async (groupId, groupData) => {
  const response = await api.put(`/groups/${groupId}`, groupData);
  return response.data;
};

// Join a group
export const joinGroup = async (groupId, username) => {
  const response = await api.post(`/groups/${groupId}/join`, { username });
  return response.data;
};

// Leave a group
export const leaveGroup = async (groupId, username) => {
  const response = await api.post(`/groups/${groupId}/leave`, { username });
  return response.data;
};

// Get polls for a group
export const getGroupPolls = async (groupId) => {
  const response = await api.get(`/groups/${groupId}/polls`);
  return response.data;
};

// Create a poll
export const createPoll = async (groupId, pollData) => {
  const response = await api.post(`/groups/${groupId}/polls`, pollData);
  return response.data;
};

// Vote on a poll
export const voteOnPoll = async (pollId, username, optionId) => {
  const response = await api.post(`/polls/${pollId}/vote`, { 
    username, 
    option_id: optionId 
  });
  return response.data;
};