import type {
  User,
  UserAttributes,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import supabase from '@services/supabase';

const AVATAR_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars`;

const auth = supabase.auth;

type SignUpFetcherArg = { arg: SignUpWithPasswordCredentials };
type SignInFetcherArg = { arg: SignInWithPasswordCredentials };
type UpdateUserArg = {
  arg:
    | { password: string }
    | {
        email?: string;
        displayName?: string;
        avatar?: string | File;
        user: User;
      };
};

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

export async function updateLoggedInUser(_: string, { arg }: UpdateUserArg) {
  const attributes: UserAttributes = {};

  if ('password' in arg) {
    attributes.password = arg.password;
  } else {
    // Upload the user's avatar to supabase
    const { avatar: file, user } = arg;
    if (file instanceof File) {
      const { data, error } = await uploadAvatar(file, user);
      if (error) {
        throw new Error('There has been an error while uploading the avatar');
      }
      // Update the avatar property with the avatar url
      arg.avatar = `${AVATAR_BASE_URL}/${data.path}`;
    }
    // Set avatar and displayName into the attributes.data property
    // to update these
    const { avatar, displayName } = arg;
    attributes.data = { displayName, avatar };
  }

  // Updates the current logged-in user data
  const { data, error } = await auth.updateUser(attributes);
  if (error) throw new Error('An error occurred while updating the user');
  return data.user;
}

async function uploadAvatar(file: File, user: User) {
  // If an avatar already exists in the storage,
  // delete that before uploading a new one.
  const { avatar } = user.user_metadata;
  const prevPath = avatar?.match(/[^/?]+(?=\?|$)/)?.at(0);
  if (prevPath) {
    await supabase.storage
      .from('avatars')
      .remove([prevPath])
      .catch(console.error);
  }
  // Catch the first part of a randomUUID
  const [id] = user.id.split('-');
  // Upload an avatar with a new name to the storage
  const extension = file.name.match(/\.[^.]+$/)?.at(0),
    randomId = crypto.randomUUID().split('-').toSpliced(1, 3).join('-'),
    path = `${id}-${randomId}${extension}`.toLowerCase().replace(/\s/g, '');
  return supabase.storage.from('avatars').upload(path, file);
}
