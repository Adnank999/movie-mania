"use client";
import { Heart } from "lucide-react"; 
import React, { useEffect, useState } from "react";
import { addMovieToCookies, deleteMovieFromCookies } from "./MovieDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { setFavourite, toggleFavourite } from "@/redux/movie/favouritesSlice";
import { MovieDetails } from "@/models/MovieDetails";

interface Props{
  movieDetails: MovieDetails
  id:number;
}

const AddToFavourite = ({ movieDetails, id }:Props) => {
  
  
  const dispatch = useDispatch();
  const isFavourite = useSelector((state) => state.favourites.favourites[id] || false);

  const handleAddToFavourite = () => {
    addMovieToCookies(movieDetails,id);
    dispatch(toggleFavourite(id));
 
    if(isFavourite){
      deleteMovieFromCookies(id)
    }
   
  };

  



  

  return (
    <div className="flex flex-row justify-center items-center gap-2">
     {isFavourite ? (
        <Heart
          onClick={handleAddToFavourite}
          className="cursor-pointer text-red-600 fill-red-600"
          
        />
      ) : (
        <Heart
          onClick={handleAddToFavourite}
          className="cursor-pointer text-gray-500 fill-none"
        />
      )}
      <h1 className="text-red-600 text-lg">Add to Watchlist</h1>
    </div>
  );
};

export default AddToFavourite;
