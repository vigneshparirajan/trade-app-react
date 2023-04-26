import { axios } from '../hooks/core';
import { useMutation } from 'react-query';

export const useSignIn = () =>
  useMutation(async (signIn: ISignIn) => {
    const res = await axios.post('/login', signIn);
    return res ? res.data : null;
  });
