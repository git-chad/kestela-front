import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

interface Props {
  options: CreateAxiosDefaults;
  getCurrentAccessToken: () => string;
  getCurrentRefreshToken: () => string;
  refreshTokenUrl: string;
  logout: () => void;
  setRefreshedToken: () => void;
}

export function createAxiosClient({
  options,
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl,
  logout,
  setRefreshedToken,
}: Props) {
  const client = axios.create(options);
  client.interceptors.request.use(
    (config) => {
      const token = getCurrentAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
}
