import { z } from "zod";


const BelongsToCollectionSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
});

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const ProductionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable().optional(),
  name: z.string(),
  origin_country: z.string(),
});

const ProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

const SpokenLanguageSchema = z.object({
  iso_639_1: z.string(),
  name: z.string(),
  english_name: z.string().optional(),
});

export const MovieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: BelongsToCollectionSchema.nullable(),
  budget: z.number(),
  genres: z.array(GenreSchema),
  homepage: z.string().url().or(z.literal("")).nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(ProductionCompanySchema),
  production_countries: z.array(ProductionCountrySchema),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(SpokenLanguageSchema),
  status: z.string(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});
