import React from "react";
import { cookies } from "next/headers";
import MovieCard from "../home/components/MovieCard";

const getMoviesFromCookies = () => {
  const cookiesStore = cookies();
  const movieCookies = cookiesStore.getAll();

  const movies = movieCookies
    .filter((cookie) => cookie.name.startsWith("movie_") && cookie.value)
    .map((cookie) => {
      try {
        return JSON.parse(cookie.value);
      } catch (error) {
       
        return null;
      }
    })
    .filter((movie) => movie !== null); 

  return movies;
};


const Page = async () => {
  const movies = getMoviesFromCookies();

  

  return (
    <div className="flex flex-col justify-center items-center w-full p-6">
      <h1 className="text-4xl text-red-600 text-center">My Wishlist</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 mt-10">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} section="watchList" />
          ))
        ) : (
          <p>No movies in your watchlist.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
