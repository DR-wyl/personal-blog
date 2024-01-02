import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  
  // baseURL: 'https://condor-concrete-officially.ngrok-free.app',
  baseURL: `http://${process.env.VUE_APP_GOBAL_HOST}:${process.env.VUE_APP_GOBAL_PORT}/${process.env.NODE_ENV}`,
});
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const configT = config;
    if (localStorage.getItem('token')) {
      configT.headers.authorization = localStorage.getItem('token');
      // configT.headers['ngrok-skip-browser-warning'] = 60940;
    }
    return configT;
  },
  (error) => {
    // 请求错误处理
    console.log('Request Error:', error);
    return Promise.reject(error);
  },
);
// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },
  (error) => {
    ElMessage.error(error.response.data.message);
    return Promise.reject(error);
  },
);
export default request;
