import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.58.167:3000', // IP da sua máquina
});

export default api;