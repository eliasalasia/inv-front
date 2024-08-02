import axios from 'axios';

const API_URL = 'http://localhost:3000/api/clientes';

export const fetchClientes = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const fetchCliente = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const addCliente = async (cliente) => {
  const { data } = await axios.post(API_URL, cliente);
  return data;
};

export const updateCliente = async ({ id, cliente }) => {
  const { data } = await axios.put(`${API_URL}/${id}`, cliente);
  return data;
};
