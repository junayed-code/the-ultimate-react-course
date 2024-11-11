import supabase from '@services/supabase';
import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

const auth = supabase.auth;

type SignUpFetcherArg = { arg: SignUpWithPasswordCredentials };
type SignInFetcherArg = { arg: SignInWithPasswordCredentials };

export async function signupFetcher(
  _: string,
  { arg: credentials }: SignUpFetcherArg,
) {
  const { data, error } = await auth.signUp(credentials);
  if (error) throw error;
  return data.user;
}

export async function loginFetcher(
  _: string,
  { arg: credentials }: SignInFetcherArg,
) {
  const { data, error } = await auth.signInWithPassword(credentials);
  if (error) throw error;
  return data.user;
}

export async function logoutFetcher() {
  const { error } = await auth.signOut();
  if (error) throw error;
  return null;
}

export async function getLoggedInUser() {
  // Check if the session is exist
  const {
    data: { session },
  } = await auth.getSession();
  if (!session) return session;

  // If session is exist then get user from the Supabase Auth Server
  const {
    data: { user },
    error,
  } = await auth.getUser();
  if (error) throw error;
  return user!;
}
