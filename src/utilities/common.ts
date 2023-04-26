import axios from 'axios';

export const api = () => {
  const instance = axios.create({ baseURL: 'https://reqres.in' });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return undefined;
    }
  );
  return instance;
};
