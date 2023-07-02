import axios from "axios";
import {UserStore} from "../store/index.js";
import Swal from "sweetalert2";

const server = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})
server.interceptors.request.use(
    (config) => {
        const token = UserStore().access_token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    },
    (error) => Promise.reject(error)
)
// 超时重试配置
const RETRY_TIMES = 3; // 重试次数
const RETRY_DELAY = 1000; // 重试延迟时间
// 响应拦截器
server.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const { config, response } = error;
        if (response) {
            // 请求已发送，响应状态码不为2xx
            const { status, data } = response;
            switch (status) {
                case 400:
                    Swal.fire({
                        icon: "error",
                        text: data.message,
                    }).then((r) => {});
                    break;
                case 401:
                    Swal.fire({
                        icon: "error",
                        text: data.message,
                    }).then((r) => {});
                    break;
                case 403:
                    Swal.fire({
                        icon: "error",
                        text: data.message,
                    }).then((r) => {});
                    break;
                case 404:
                    Swal.fire({
                        icon: "error",
                        text: data.message,
                    }).then((r) => {});
                    break;
                case 500:
                    Swal.fire({
                        icon: "error",
                        text: data.message,
                    }).then((r) => {});
                    break;
                default:
                    break;
            }
        } else {
            // 请求未发送，发生错误（如超时）
            let retryCount = config.retryCount || 0;
            if (retryCount < RETRY_TIMES) {
                config.retryCount = retryCount + 1;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(axios(config));
                    }, RETRY_DELAY);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    text: "网络请求超时",
                }).then((r) => {});
            }
        }
        return Promise.reject(error);
    }
);


export default server;
