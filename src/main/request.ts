import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export default (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000, // 超时配置
    withCredentials: true, // 跨域携带cookie
    ...config, // 自定义配置覆盖基本配置
  });

  instance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      // 在发送请求之前做些什么
      console.log('config:', request);
      // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");
      return request;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('response:', response);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
