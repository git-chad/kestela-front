import axios from 'axios';
import { getSession } from 'next-auth/react';

export function ApiClient() {
  const instance = axios.create();
  instance.interceptors.request.use(
    async (request) => {
      const session = await getSession();
      console.log('Session: ', session);
      if (session) {
        request.headers.Authorization = `bearer ${session.access_token}`;
      }
      return request;
    },
    (error) => {
      throw error;
    }
  );
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Interceptor response error: ', error);
      throw error;
    }
  );

  return instance;
}
