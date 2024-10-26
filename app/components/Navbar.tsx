"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setSearchTerm,
  setSearchResults,
  clearSearch,
  setPage,
} from "../../redux/movie/searchSlice";
import { useSearchMoviesQuery } from "@/redux/movie/movieApi";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";

const searchSchema = z.object({
  searchTerm: z.string().min(3, "Please enter at least 3 characters"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const Navbar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.search.page);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );

  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);

  const { data, error, isLoading } = useSearchMoviesQuery(
    { query: localSearchTerm, page: 1 },
    { skip: localSearchTerm.length < 3 }
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { searchTerm: "" },
  });

  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedInputChange = _.debounce((value) => {
    if (value.trim() === "") {
      setSuggestions([]);
      dispatch(clearSearch());
      dispatch(setSearchResults([])); 
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("searchTerm", value);
    setLocalSearchTerm(value);
    debouncedInputChange(value);
  };

  useEffect(() => {
    if (data && data.results) {
      setSuggestions(data.results); 
     
    }
  }, [data]);

  
  // const onSubmit = () => {
  //   if (localSearchTerm.trim().length >= 3) {
  //     dispatch(setSearchResults([]));
  //     dispatch(setSearchTerm(localSearchTerm)); 
    
  //   } else {
  //     dispatch(setSearchTerm("")); 
  //   }
  // };

  const onSubmit = () => {
    if (localSearchTerm.trim().length >= 3) {
      dispatch(setSearchResults([]));
      dispatch(setSearchTerm(localSearchTerm));
      setSuggestions([]); 
    } else {
      dispatch(setSearchTerm(""));
      setSuggestions([]); 
    }
  };
  



  return (
    <section>
      <nav className="flex flex-col lg:flex-row-reverse items-center justify-center gap-4 lg:gap-0 bg-gradient-to-r from-red-500 to-red-800 px-8 py-1 shadow-sm">
        <div className="flex flex-row justify-center items-center gap-4 lg:gap-16 ml-0 lg:ml-24">
          <div className="ml-0 ">
            <Link href="/">Home</Link>
          </div>
          <div className="ml-0 ">
            <Link href="/watchlist">My WatchList</Link>
          </div>
          <div className="ml-0 ">
            <ModeToggle />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-gray-500" size={20} />
          </span>
          <input
            type="text"
            {...register("searchTerm")}
            className="text-center lg:text-start pl-6 lg:pl-24 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Search..."
            value={localSearchTerm} 
            onChange={handleInputChange}
          />
          {errors.searchTerm && (
            <p className="absolute top-full left-0 mt-1 text-sm text-white">
              {errors.searchTerm.message}
            </p>
          )}
        </form>
      </nav>

  

      {localSearchTerm && suggestions.length > 0 && (
        <div ref={searchRef} className="container w-full lg:w-[50%] mx-auto p-4 h-[500px] overflow-auto bg-gray-800 rounded-lg shadow-lg">
          {isLoading && <p>Loading suggestions...</p>}
          {error && <p>Error loading suggestions</p>}
          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((movie: any) => (
                <li key={movie.id} className="text-white py-2">
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default Navbar;
