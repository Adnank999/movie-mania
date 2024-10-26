"use client";
import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Minus } from "lucide-react";
import { deleteMovieFromCookies } from "@/app/movieDetails/[id]/components/MovieDetailsCard";
import { useDispatch } from "react-redux";
import { setFavourite } from "@/redux/movie/favouritesSlice";
interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
  section: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, section }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
  const router = useRouter();

  const dispatch = useDispatch();
  const handleCardClick = () => {
    router.push(`/movieDetails/${movie.id}`);
  };

  const handleDeleteFavourite = () => {
    deleteMovieFromCookies(movie.id);
    dispatch(setFavourite({ id: movie.id, isFavourite: false }));
    const persistRoot = localStorage.getItem("persist:root");

    if (persistRoot) {
      try {
        const parsedRoot = JSON.parse(persistRoot);
        const favourites = JSON.parse(parsedRoot.favourites || "{}");

        delete favourites[movie.id];

        parsedRoot.favourites = JSON.stringify(favourites);

        localStorage.setItem("persist:root", JSON.stringify(parsedRoot));
      } catch (error) {
        console.error("Error removing favourite from localStorage:", error);
      }
    }
  };

  return (
    <Card
      className={`${
        section === "watchList" ? "max-w-xs" : "max-w-sm"
      } shadow-lg cursor-pointer hover:scale-110`}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          alt={movie.title}
          loading="lazy"
          width={0}
          height={0}
          sizes="100vw"
          className={`rounded-t-lg object-contain w-full h-64`}
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-semibold text-center">{movie.title}</h2>
      </CardContent>

      {section === "watchList" && (
        <CardFooter
          className="flex flex-row justify-center items-center w-full"
          onClick={handleDeleteFavourite}
        >
          <Minus color="red" />
          <h1 className="text-center">Remove from watchList</h1>
        </CardFooter>
      )}
    </Card>
  );
};

export default MovieCard;
