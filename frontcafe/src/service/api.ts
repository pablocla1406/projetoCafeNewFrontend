import axios from "axios";

const api = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        'Context-type' : 'application/json'
    }
})

export default api