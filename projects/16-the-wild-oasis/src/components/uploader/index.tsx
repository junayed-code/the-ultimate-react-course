import { mutate } from 'swr';
import { useState } from 'react';
import { isFuture, isPast, isToday } from 'date-fns';

import Button from '@ui/button';

import supabase from '@services/supabase';
import { subtractDates } from '@utils/helpers';
import { Database } from '@services/supabase/database.types';

import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';
import Spinner from '../ui/spinner';

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

const db = (relation: keyof Database['public']['Tables']) =>
  supabase.from(relation);

async function deleteGuests() {
  const { error } = await db('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await db('cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await db('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await db('guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await db('cabins').insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await db('guests').select('id').order('id');
  if (!guestsIds) return;

  const allGuestIds = guestsIds.map(guest => guest.id);
  const { data: cabinsIds } = await db('cabins').select('id').order('id');
  if (!cabinsIds) return;

  const allCabinIds = cabinsIds.map(cabin => cabin.id);

  const finalBookings = bookings.map(booking => {
    // Here relying on the order of cabins, as they don't have an ID yet
    const cabin = cabins.at(booking.cabin_id - 1)!;
    const nights = subtractDates(booking.end_date, booking.start_date);
    const cabinPrice = nights * (cabin.price - cabin.discount);
    const extrasPrice = booking.has_breakfast
      ? nights * 15 * booking.guests_count
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status = '';
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = 'checked-out';
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = 'checked-in';

    return {
      ...booking,
      status,
      nights,
      cabin_price: cabinPrice,
      extra_price: extrasPrice,
      total_price: totalPrice,
      guest_id: allGuestIds.at(booking.guest_id - 1)!,
      cabin_id: allCabinIds.at(booking.cabin_id - 1)!,
    };
  });

  const { error } = await db('bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [{ isUploadingAll, isUploadingBookings }, setIsLoading] = useState({
    isUploadingAll: false,
    isUploadingBookings: false,
  });
  const isDisabled = isUploadingAll || isUploadingBookings;

  async function uploadAll() {
    setIsLoading(loadings => ({ ...loadings, isUploadingAll: true }));
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    // Revalidate all cached data
    mutate(() => true);

    setIsLoading(loadings => ({ ...loadings, isUploadingAll: false }));
  }

  async function uploadBookings() {
    setIsLoading(loadings => ({ ...loadings, isUploadingBookings: true }));
    await deleteBookings();
    await createBookings();
    // Revalidate all bookings related cache data
    mutate(key => {
      if (typeof key === 'string') {
        return /bookings?/.test(key);
      } else if (Array.isArray(key)) {
        return key.some((k: string) => /bookings?/.test(k));
      }
      return false;
    });
    setIsLoading(loadings => ({ ...loadings, isUploadingBookings: false }));
  }

  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: 'var(--color-grey-100)',
        padding: '0.75rem',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <h4>SAMPLE DATA</h4>

      <Button onClick={uploadAll} disabled={isDisabled}>
        {isUploadingAll ? <Spinner $size="sm" /> : 'Upload ALL'}
      </Button>

      <Button onClick={uploadBookings} disabled={isDisabled}>
        {isUploadingBookings ? <Spinner $size="sm" /> : 'Upload bookings ONLY'}
      </Button>
    </div>
  );
}

export default Uploader;
