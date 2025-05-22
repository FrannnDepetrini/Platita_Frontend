import axios from "axios";


const api = axios.create({
    baseURL: 'https:/localhost.com:5000/api',
    timeout: 5000
});


api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            const errorMessage = error.response.data?.message || "Error en la solicitud";
            const status = error.response.status;

            if (status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/';
            }

            return Promise.reject({
                message: errorMessage,
                status,
                data: error.response.data
            });
        } else {
            return Promise.reject({ message: error.message });
        }
    }
)

export default api;