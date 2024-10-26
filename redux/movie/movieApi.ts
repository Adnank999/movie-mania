
import { apiSlice } from '../apiSlice';

export const movieApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (page = 1) => `movie/popular?page=${page}`,  
    }),
    searchMovies: builder.query({
      query: ({ query, page = 1 }) => `search/movie?query=${query}&page=${page}`, 
    }),
  }),
  overrideExisting: false,
});

export const { useGetPopularMoviesQuery,useSearchMoviesQuery } = movieApi;
