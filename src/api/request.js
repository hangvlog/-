import axios from "axios";
// 引入进度条效果
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

import store from '@/store'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

requests.interceptors.request.use((config) => {
    nprogress.start()
    // console.log(store)
    // 配置请求头
    if (store.state.detail.uuid)
        config.headers.userTempId = store.state.detail.uuid
    if (store.state.user.token)
        config.headers.token = store.state.user.token
    return config;
})

requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data;
}, (err) => {
    return Promise.reject(new Error(err.message));
});

export default requests;