import axios from 'axios';

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const baseUrl = import.meta.env.API_HOST || 'http://localhost:4000';

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  config.headers['Authorization'] = !config._retry && accessToken ? `Bearer ${accessToken}`: config.headers.Authorization;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
        try{ 
            const response = await api.post('/api/v1/user/refresh');
            setAccessToken(response.data.accessToken);
            originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;
            return api(originalRequest);
        } catch(error){
            setAccessToken(null)
        }
    }
    return Promise.reject(err);
  }
);

export default api;