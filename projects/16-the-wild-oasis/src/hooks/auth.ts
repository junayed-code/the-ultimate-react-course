import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';

import { loginFetcher } from '@services/api/auth';

export function useLogin() {
  const navigate = useNavigate();
  const {
    trigger: loginTrigger,
    isMutating: isLogin,
    ...swr
  } = useSWRMutation('user', loginFetcher, {
    revalidate: false,
    populateCache: true,
    onSuccess() {
      toast.success('You are successfully logged in');
      navigate('/dashboard');
    },
    onError() {
      toast.error('Incorrect email or password');
    },
  });

  return { loginTrigger, isLogin, ...swr };
}
