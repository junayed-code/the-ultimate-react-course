import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '@/services/api/geocoding';
import type { RootState } from '@/store';

type UserState = {
  username: string;
  address: string;
  status: 'idle' | 'loading' | 'error';
  position: { latitude: number; longitude: number } | null;
};
const initialState: UserState = {
  username: '',
  address: '',
  status: 'idle',
  position: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAddress.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddress.rejected, state => {
        state.status = 'error';
      }),
});

export const fetchAddress = createAsyncThunk('user/address', async function () {
  const {
    coords: { latitude, longitude },
  } = await new Promise<GeolocationPosition>(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const position = { latitude, longitude };
  const result = await getAddress(position);
  const address = `${result?.locality}, ${result?.city}, ${result?.countryName}`;

  return { position, address };
});

export const getUsername = (state: RootState) => state.user.username;

export const {
  reducer: userReducer,
  actions: { update: updateUsername },
} = userSlice;
