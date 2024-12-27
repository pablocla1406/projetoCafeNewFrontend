import axios from "axios";

const api = axios.create({
    baseURL: 'http://35.198.52.200:3000', // Use o IP do servidor backend com a porta
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
