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
  signupFetcher,
} from '@services/api/auth';

type SignUpCredentials = {
  email: string;
  password: string;
  optionalData?: { displayName?: string; avatar?: string | null };
};

export function useSignUp() {
  const { trigger, isMutating, ...swr } = useSWRMutation(
    'signup',
    signupFetcher,
    {
      onSuccess() {
        toast.success(
          'The account is successfully created! Please verify this account to see your mail inbox.',
        );
      },
      onError(error) {
        switch (error?.code) {
          case 'email_address_not_authorized':
            toast.error(
              'Turn off the confirm email option or set up the custom SMTP provider to send verification emails to verify users',
            );
            break;
          default:
            toast.error('An error occurred while creating the account!');
        }
      },
    },
  );

  const signupTrigger = ({
    email,
    password,
    optionalData,
  }: SignUpCredentials) => {
    return trigger({
      email,
      password,
      options: { data: optionalData },
    });
  };

  return { signupTrigger, isSigningUp: isMutating, ...swr };
}

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
