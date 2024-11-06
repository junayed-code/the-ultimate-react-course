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
  return data;
}
