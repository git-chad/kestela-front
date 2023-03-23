import axios from 'axios';
import { getSession } from 'next-auth/react';

export function ApiClient(baseURL: string) {
  const instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(
    async (request) => {
      const session = await getSession();
      if (session) {
        request.headers.Authorization = `bearer ${session.access_token}`;
      }
      return request;
    },
    (error) => {
      console.log('Request error in interceptor: ', error);
      throw error;
    }
  );
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Response error in interceptor: ', error);
      throw error;
    }
  );

  return instance;
}
