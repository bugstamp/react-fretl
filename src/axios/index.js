import axios from 'axios';

export default axios.create({
  baseUrl: process.env.API_URL || 'http://localhost:3000',
  withCredentials: true,
});
