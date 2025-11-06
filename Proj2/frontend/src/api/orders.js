// api/orders.js
import api from './axios';

// Get all orders in a group
export const getGroupOrders = async (groupId) => {
  const response = await api.get(`/groups/${groupId}/orders`);
  return response.data;
};

// Add or update an order for the current user in a group
export const placeGroupOrder = async (groupId, orderData) => {
  // orderData: { items: [...], nextOrderTime: 'ISO string' }
  console.log('Placing group order with data:', orderData);
  const response = await api.post(`/groups/${groupId}/orders`, orderData);
  return response.data;
};
// // Add or update an order for the current user in a group
// export const placeGroupOrder = async (groupId, items, nextOrderTime) => {
//   const response = await api.post(`/groups/${groupId}/orders`, {
//     items,
//     nextOrderTime
//   });
//   return response.data;
// };

// Delete the current user's order in a group
export const deleteGroupOrder = async (groupId) => {
  const response = await api.delete(`/groups/${groupId}/orders`);
  return response.data;
};

export const placeImmediateOrder = async (groupId, items) => {
  return api.post(`/groups/${groupId}/orders/immediate`, { items });
};
