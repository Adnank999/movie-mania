"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  setPage,
  setSearchResults,
} from "@/redux/movie/searchSlice";
import {
  useSearchMoviesQuery,
  useGetPopularMoviesQuery,
} from "../../../redux/movie/movieApi";
import MovieCard from "./MovieCard";
import { RootState } from "@/redux/store";
import _ from "lodash";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import MovieCardSkeleton from "@/app/components/MovieCardSkeleton";
gsap.registerPlugin(ScrollTrigger);


const PopularMovies: React.FC = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const searchResults = useSelector((state: RootState) => state.search.searchResults);

  const { data: searchData, isFetching: isSearchFetching } = useSearchMoviesQuery(
    { query: searchTerm, page: pageNumber },
    { skip: !searchTerm }
  );
  const { data: popularData, error, isFetching,refetch } = useGetPopularMoviesQuery(pageNumber, {
    skip: !!searchTerm,
  });

  useEffect(() => {
    setMovies([]);
    setPageNumber(1);
    dispatch(setSearchResults([]));
    if(!searchTerm){
      refetch();
    }
  }, [searchTerm,refetch]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
    (node) => {
      if (isFetching || isSearchFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, isSearchFetching, hasMore]
  );

  useEffect(() => {
    if (searchTerm) {
      if (searchData?.results) {
        setMovies((prevMovies) => [...prevMovies, ...searchData.results]);
        setHasMore(searchData.page < searchData.total_pages);
      }
    } else if (popularData?.results) {
      setMovies((prevMovies) => [...prevMovies, ...popularData.results]);
      setHasMore(popularData.page < popularData.total_pages);
    }
  }, [searchData, popularData, searchTerm]);

 
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

   
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  if (error) return <div>Error loading movies.</div>;

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4 text-center ">Popular Movies</h1>

    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //     {movies.map((movie, index) => {
    //       if (movies.length === index + 1) {
    //         return (
    //           <div ref={lastMovieElementRef} key={movie.id}>
    //             <MovieCard movie={movie} section={searchTerm ? 'searchResults' : 'popularMovies'} />
    //           </div>
    //         );
    //       } else {
    //         return (
    //           <MovieCard
    //             key={movie.id}
    //             movie={movie}
    //             section={searchTerm ? 'searchResults' : 'popularMovies'}
    //           />
    //         );
    //       }
    //     })}
    //   </div>

    //   {(isFetching || isSearchFetching) && <div>Loading more movies...</div>}
    // </div>

    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center ">Popular Movies</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie, index) => {
        const MovieCardContent = (
          <Suspense fallback={<MovieCardSkeleton />}>
            <MovieCard movie={movie} section={searchTerm ? 'searchResults' : 'popularMovies'} />
          </Suspense>
        );

        if (movies.length === index + 1) {
          return (
            <div ref={lastMovieElementRef} key={movie.id}>
              {MovieCardContent}
            </div>
          );
        } else {
          return <div key={movie.id}>{MovieCardContent}</div>;
        }
      })}
    </div>

    {(isFetching || isSearchFetching) && <div>Loading more movies...</div>}
  </div>
  );
};



export default PopularMovies;
