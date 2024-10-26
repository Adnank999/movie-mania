import React from "react";
import MovieDetailsCard from "./components/MovieDetailsCard";
import { Recommendations } from "@/models/Recommendations";
import RecommendationCard from "./components/RecommendationCard";

interface Props {
  params: {
    id: number;
  };
}

export default async function MovieDetails({ params }: Props) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_HOST}movie/${params.id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: { revalidate: 60 },
    }
  );
  const movieDetails = await response.json();



  const recommendation = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_HOST}movie/${params.id}/recommendations`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: { revalidate: 60 },
    }
  );

  const recommendationDetails:Recommendations = await recommendation.json();

  return (
    <div className="mx-auto max-w-4xl mt-6">
      <MovieDetailsCard movieDetails={movieDetails} id={params.id}/>
      <RecommendationCard recommendationDetails={recommendationDetails}/>
    </div>
  );
}
