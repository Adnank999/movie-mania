'use server'
import { Cast, CastResult } from "@/models/Cast";
import { MovieDetails } from "@/models/MovieDetails";
import { Recommendations } from "@/models/Recommendations";
import Image from "next/image";
import React from "react";
import RecommendationCard from "./RecommendationCard";
import AddToFavourite from "./AddToFavourite";
import { cookies } from "next/headers";
import { z } from "zod";
import { MovieDetailsSchema } from "@/models/MovieDetailsSchema";

interface Props {
  id: number;
  movieDetails: MovieDetails;
}

export default async function MovieDetailsCard({ movieDetails, id }: Props) {

  const validMovieDetails = MovieDetailsSchema.parse(movieDetails);


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_HOST}movie/${id}/credits`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: { revalidate: 60 },
    }
  );
  const castDetails: CastResult = await response.json();



  const imageUrl = `https://image.tmdb.org/t/p/w300${validMovieDetails?.belongs_to_collection?.poster_path}`;
  
  


  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      { imageUrl === "https://image.tmdb.org/t/p/w300undefined" || imageUrl === "https://image.tmdb.org/t/p/w300null" ? (
        
        <div className="w-[500px] h-[300px] bg-gray-300 flex flex-col justify-center items-center">
          <span className="text-black ">No Image</span>
        </div>
      ) : (
        <Image
          src={imageUrl}
          width={0}
          height={0}
          alt="movie-poster"
          className="w-72 h-auto"
          unoptimized
        />
      )}

        <AddToFavourite movieDetails={validMovieDetails} id={id} />
      </div>
      

      <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6">
        <div>
          <h1 className="text-xl text-red-600 text-center lg:text-start">Overview</h1>
          <h4 className="text-center lg:text-start">{validMovieDetails.overview}</h4>
        </div>

        <div className="">
          <h1 className="text-xl text-red-600 text-center lg:text-start">Genre</h1>
          <div className="flex flex-wrap gap-2 items-center">
            {validMovieDetails.genres.map((genre, index) => (
              <React.Fragment key={genre.id}>
                <span>{genre.name}</span>
                
                {index < validMovieDetails.genres.length - 1 && <span>&bull;</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="">
          <h1 className="text-xl text-red-600 text-center lg:text-start">Release Date</h1>
          <div className="flex flex-wrap gap-2 items-center ">
            <h1 className="text-center lg:text-start">{validMovieDetails.release_date}</h1>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-4">
          <h1 className="text-xl text-red-600">Cast and Crew</h1>
          <div className="grid grid-cols-5 gap-6">
            {castDetails.cast.map((castMember) => (
              <div
                key={castMember.id}
                className="text-center flex flex-col justify-center items-center "
              >
                {castMember.profile_path ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                      alt={castMember.name}
                      width={96}
                      height={96}
                      className="object-contain w-full h-full"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs lg:text-lg">No Image</span>
                  </div>
                )}
                <p className="text-center mt-2 text-xs">{castMember.name}</p>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}

export async function addMovieToCookies(movieDetails: MovieDetails, id: number) {
  'use server';

  try {
    const movieCookieKey = `movie_${id}`;
    const movieData = JSON.stringify(movieDetails);

    
    cookies().set(movieCookieKey, movieData, { path: '/', maxAge: 60 * 60 * 24 }); 

    // console.log(`Movie with ID ${id} saved to cookies`);
  } catch (error) {
    // console.error("Error saving movie to cookies:", error);
  }
}

export async function deleteMovieFromCookies(id: number) {
  'use server';

  try {
    const movieCookieKey = `movie_${id}`;


    cookies().delete(movieCookieKey);

  
  } catch (error) {
    console.error("Error deleting movie from cookies:", error);
  }
}
