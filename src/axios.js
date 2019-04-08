import axios from "axios";

    const instance = axios.create({
        baseURL: 'http://89.163.221.56:8881/api'
    });
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    instance.interceptors.response.use(
        (response) => {

            return response
        },
        (error) => {
        return Promise.reject(error)
        }
    )

export default instance;
