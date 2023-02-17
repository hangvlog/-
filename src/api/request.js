import axios from "axios";
// 引入进度条效果
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

requests.interceptors.request.use((config) => {
    nprogress.start()
    return config;
})

requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data;
}, (err) => {
    return Promise.reject(new Error(err.message));
});

export default requests;