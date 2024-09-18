import supabase from '@services/supabase';
import { parseFile } from '@utils/parse-file';
import { CreateCabinSchema, UpdateCabinSchema } from '@/schemas';
import { TablesInsert, TablesUpdate } from '@services/supabase/database.types';

const IMAGE_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabins`;

const db = () => supabase.from('cabins');
const storage = () => supabase.storage.from('cabins');

export type CabinInsert = Omit<
  TablesInsert<'cabins'>,
  'id' | 'created_at' | 'image'
> & { image: File | string };

export type CabinUpdate = Omit<TablesUpdate<'cabins'>, 'image'> & {
  id: number;
  image: { path: string; file?: File };
};

export const cabinsFetcher = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) throw error;
  return data;
};

export const createCabin = async (_: string, { arg }: { arg: CabinInsert }) => {
  let imagePath: string = '';
  const { image } = arg;

  const isImageFile = typeof image !== 'string' && image instanceof File;
  if (isImageFile) {
    imagePath = parseFile(image).randomName;
    arg.image = `${IMAGE_BASE_URL}/${imagePath}`;
  }

  // Create a new cabin with the cabin image file URL
  const cabin = CreateCabinSchema.cast(arg, { stripUnknown: true });
  const { data, error } = await db().insert(cabin).select().single();
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  if (!isImageFile || !imagePath) return data;

  // Upload the cabin image
  const { error: uploadError } = await uploadCabinImage(imagePath, image);
  // If cabin image cannot upload then delete the cabin
  if (uploadError) {
    await deleteCabin(data.id);
    throw new Error("Cabin image could not uploaded so cabin wasn't created");
  }

  return data;
};

export const updateCabin = async (_: string, { arg }: { arg: CabinUpdate }) => {
  const { id, image, ...rest } = arg;

  if (image.file !== undefined) {
    const path = image.path.split('/').pop() as string;
    const { error } = await updateCabinImage(path, image.file);

    if (error) {
      console.error(error);
      throw new Error(
        "Cabin image could not be updated so cabin wasn't updated",
      );
    }
  }

  const values = { ...rest, image: image.path };
  const cabin = UpdateCabinSchema.cast(values, { stripUnknown: true });
  const { data, error } = await db()
    .update(cabin)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be updated');
  }

  return data;
};

export const deleteCabin = async (id: number) => {
  const { data, error } = await db().delete().eq('id', id).select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
  // Delete the cabin image as well
  const path = data.image.split('/').pop() as string;
  const { error: deleteImageError } = await deleteCabinImages(path);
  if (deleteImageError) {
    console.log(deleteImageError);
    throw new Error('The cabin image could not be deleted');
  }
};

const uploadCabinImage = (path: string, file: File) => {
  return storage().upload(path, file);
};

const updateCabinImage = (path: string, file: File) => {
  return storage().update(path, file);
};

const deleteCabinImages = (...paths: string[]) => {
  return storage().remove(paths);
};
