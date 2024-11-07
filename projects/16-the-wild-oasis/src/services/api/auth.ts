import supabase from '@services/supabase';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';

const auth = supabase.auth;

type FetcherArg = { arg: SignInWithPasswordCredentials };

export async function loginFetcher(
  _: string,
  { arg: credentials }: FetcherArg,
) {
  const { data, error } = await auth.signInWithPassword(credentials);
  if (error) throw error;
  return data.user;
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
