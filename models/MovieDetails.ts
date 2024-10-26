export interface MovieDetails {
    adult: boolean
    backdrop_path: string | null;
    belongs_to_collection: BelongsToCollection | null;
    budget: number
    genres: Genre[]
    homepage: string | null
    id: number
    imdb_id: string | null
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string | null
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface BelongsToCollection {
    id? : number | undefined
    name?: string | undefined
    poster_path?: any
    backdrop_path?: string | null | undefined
  }
  
  export interface Genre {
    id: number
    name: string
  }
  
  export interface ProductionCompany {
    id: number
    logo_path?: string | null | undefined
    name: string
    origin_country: string
  }
  
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface SpokenLanguage {
    english_name?: string | undefined
    iso_639_1: string
    name: string
  }
  