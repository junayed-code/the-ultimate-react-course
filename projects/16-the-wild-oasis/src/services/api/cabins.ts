import supabase from '@services/supabase';

export const cabinsFetcher = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) throw error;
  return data;
};

export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
};
