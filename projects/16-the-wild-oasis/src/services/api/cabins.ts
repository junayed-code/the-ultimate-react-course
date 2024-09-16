import supabase from '@services/supabase';
import { CreateCabinSchema } from '@/schemas';
import { parseFile } from '@utils/parse-file';
import { TablesInsert } from '@services/supabase/database.types';

const IMAGE_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabins`;

export type CabinInsert = Omit<
  {
    [R in keyof TablesInsert<'cabins'>]: TablesInsert<'cabins'>[R];
  },
  'id' | 'created_at' | 'image'
> & { image: File };

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

export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
};
