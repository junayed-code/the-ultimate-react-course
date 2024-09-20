import supabase from '@services/supabase';
import { TablesInsert } from '@services/supabase/database.types';

const db = () => supabase.from('settings');

export async function settingsFetcher() {
  const { data, error } = await db()
    .select('min_bookings, max_bookings, guests_per_bookings, breakfast_price')
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(setting: TablesInsert<'settings'>) {
  // There is only ONE row of settings, and it has the ID=1, and
  // so this is the updated one
  const { data, error } = await db()
    .update(setting)
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }

  return data;
}
