import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tables } from '@services/supabase/database.types';

function useFilterCabins(data: Array<Tables<'cabins'>> | undefined) {
  const [searchParams] = useSearchParams();

  const cabins = useMemo(() => {
    if (!data || searchParams.size === 0) return data;

    // Filter by discount
    if (searchParams.has('discount')) {
      switch (searchParams.get('discount')) {
        case 'no':
          return data.filter(cabin => cabin.discount === 0);
        case 'yes':
          return data.filter(cabin => cabin.discount !== 0);
        default:
          return data;
      }
    }
  }, [data, searchParams]);

  return cabins;
}

export { useFilterCabins };
