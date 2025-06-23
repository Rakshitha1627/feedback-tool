// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // FastAPI base URL
});

export default API;
