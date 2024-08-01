import axios from 'axios';

const api2 = axios.create({
    baseURL: process.env.API_URL_BACKEND,
});

export default api2;
