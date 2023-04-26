import axios from 'axios';
import { useState, useEffect } from 'react';

//#region Axios
axios.defaults.baseURL = 'https://reqres.in/api';
// axios.interceptors.request.use();
axios.interceptors.response.use(
  (res) => res,
  (_) => null
);

//#endregion

//#region Session
const useSession = (key: any, defaultValue: any) => {
  const getSession = (key: any, defaultValue: any) => {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  };

  const [value, setValue] = useState(getSession(key, defaultValue));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
//#endregion

export { axios, useSession };
