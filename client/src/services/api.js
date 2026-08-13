import axios from "axios";

const API_URL = "http://localhost:5000";

export const login = () => {
  window.location.href =
    `${API_URL}/auth/login`;
};

export const getSession = () =>
  axios.get(`${API_URL}/auth/session`);

export const getRecords = (
  objectName,
  offset
) =>
  axios.get(
    `${API_URL}/api/records/${objectName}?offset=${offset}`
  );

export const createRecord = (
  objectName,
  data
) =>
  axios.post(
    `${API_URL}/api/records/${objectName}`,
    data
  );

export const updateRecord = (
  objectName,
  id,
  data
) =>
  axios.patch(
    `${API_URL}/api/records/${objectName}/${id}`,
    data
  );

export const deleteRecord = (
  objectName,
  id
) =>
  axios.delete(
    `${API_URL}/api/records/${objectName}/${id}`
  );
