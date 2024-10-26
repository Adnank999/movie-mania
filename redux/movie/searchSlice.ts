import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  searchResults: any[];
  page: number;
}

const initialState: SearchState = {
  searchTerm: '',
  searchResults: [],
  page: 1, 
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload; 
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.searchResults = [];
      state.page = 1; 
    },
  },
});

export const { setSearchTerm, setSearchResults, setPage, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;

