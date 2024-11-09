import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';
import useSWRImmutable from 'swr/immutable';
import { useLocation, useNavigate } from 'react-router-dom';
import { type SWRConfiguration } from 'swr';
import { type User } from '@supabase/supabase-js';

import { getLoggedInUser, loginFetcher } from '@services/api/auth';

export function useLogin() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    trigger: loginTrigger,
    isMutating: isLogin,
    ...swr
  } = useSWRMutation('user', loginFetcher, {
    revalidate: false,
    populateCache: true,
    onSuccess() {
      toast.success('You are successfully logged in');
      const to = 'pathname' in state ? state.pathname : '/dashboard';
      navigate(to);
    },
    onError() {
      toast.error('Incorrect email or password');
    },
  });

  return { loginTrigger, isLogin, ...swr };
}

export function useAuth(config?: SWRConfiguration<User | null>) {
  const { data: user, ...swr } = useSWRImmutable(
    'user',
    getLoggedInUser,
    config,
  );
  const isAuthenticated = user?.role === 'authenticated';

  return { user, isAuthenticated, ...swr };
}
