import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';
import useSWRImmutable from 'swr/immutable';
import { useLocation, useNavigate } from 'react-router-dom';
import { mutate, type SWRConfiguration } from 'swr';
import { type User } from '@supabase/supabase-js';

import {
  getLoggedInUser,
  loginFetcher,
  logoutFetcher,
} from '@services/api/auth';

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

export function useLogout() {
  const {
    trigger: logoutTrigger,
    isMutating: isLoggingOut,
    ...swr
  } = useSWRMutation('user', logoutFetcher, {
    revalidate: false,
    populateCache: true,
    onSuccess() {
      // Clear the all cache data
      mutate(_key => true, undefined, { revalidate: false });
    },
    onError() {
      toast.error('An error occurred while logging out the user');
    },
  });

  const handleLogout = () => logoutTrigger();

  return { handleLogout, logoutTrigger, isLoggingOut, ...swr };
}
