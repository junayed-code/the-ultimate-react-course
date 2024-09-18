import supabase from '@services/supabase';
import { parseFile } from '@utils/parse-file';
import { CreateCabinSchema, UpdateCabinSchema } from '@/schemas';
import { TablesInsert, TablesUpdate } from '@services/supabase/database.types';

const IMAGE_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabins`;

const db = supabase.from('cabins');
const storage = supabase.storage.from('cabins');

export type CabinInsert = Omit<
  TablesInsert<'cabins'>,
  'id' | 'created_at' | 'image'
> & { image: File };

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
  const { image: ImageFile } = arg;
  const { randomName: imageName } = parseFile(ImageFile);
  const image = `${IMAGE_BASE_URL}/${imageName}`;

  // Create a new cabin with the cabin image file URL
  const cabin = CreateCabinSchema.cast({ ...arg, image });
  const { data, error } = await supabase.from('cabins').insert(cabin).select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // Upload the cabin image
  const { error: imageUploadError } = await supabase.storage
    .from('cabins')
    .upload(imageName, ImageFile);

  // If cabin image cannot upload then delete the cabin
  if (imageUploadError) {
    await deleteCabin(data[0].id);
    throw new Error("Cabin image could not uploaded so cabin wasn't created");
  }

  return data[0];
};

export const updateCabin = async (_: string, { arg }: { arg: CabinUpdate }) => {
  const { id, image, ...rest } = arg;

  if (image.file !== undefined) {
    const filename = image.path.split('/').pop() as string;
    const { error } = await updateCabinImage(filename, image.file);

    if (error) {
      console.error(error);
      throw new Error(
        "Cabin image could not be updated so cabin wasn't updated",
      );
    }
  }

  const values = { ...rest, image: image.path };
  const cabin = UpdateCabinSchema.cast(values, { stripUnknown: true });
  const { data, error } = await db.update(cabin).eq('id', id).select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be updated');
  }

  return data;
};

export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
};

const updateCabinImage = (path: string, file: File) => {
  return storage.update(path, file);
};
