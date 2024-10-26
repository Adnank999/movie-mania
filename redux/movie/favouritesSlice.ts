
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouritesState {
  favourites: Record<number, boolean>; 
}

const initialState: FavouritesState = {
  favourites: {},
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      state.favourites[movieId] = !state.favourites[movieId];
    },
    setFavourite: (state, action: PayloadAction<{ id: number; isFavourite: boolean }>) => {
      const { id, isFavourite } = action.payload;
      state.favourites[id] = isFavourite;
    },
  },
});

export const { toggleFavourite, setFavourite } = favouritesSlice.actions;


export default favouritesSlice.reducer;
