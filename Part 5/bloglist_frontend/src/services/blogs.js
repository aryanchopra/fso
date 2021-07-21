import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs/";

let token = null;
const setToken = (newToken) => {
  console.log("Setting token ");
  token = `bearer ${newToken}`;
  console.log(token);
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};
const update = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(baseUrl + id, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl + id, config);
};
export default { getAll, create, setToken, update, deleteBlog };
