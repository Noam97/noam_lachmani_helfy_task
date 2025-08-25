import axios from "axios";
const API = "/api/tasks";

export const getTasks   = () => axios.get(API).then(r => r.data);
export const createTask = (t) => axios.post(API, t).then(r => r.data);
export const updateTask = (id, t) => axios.put(`${API}/${id}`, t).then(r => r.data);
export const deleteTask = (id) => axios.delete(`${API}/${id}`).then(r => r.data);
export const toggleTask  = (id) => axios.patch(`${API}/${id}/toggle`).then(r => r.data);

