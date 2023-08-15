import axios from "axios";
import { API_KEY, API_URL } from "@env";

export interface Data {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  [key: number]: string;
}

const genres: Genre = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10770: "TV Movie",
};

export interface Movie {
  key: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  description: string;
  releaseDate: string;
  genres: string[];
}

const options = {
  method: "GET",
  url: API_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const useFetchMovies = async () => {
  try {
    const { data } = await axios.request<Data>(options);
    const movies: Movie[] = data.results.map(
      ({
        id,
        original_title,
        poster_path,
        backdrop_path,
        vote_average,
        overview,
        release_date,
        genre_ids,
      }) => ({
        key: String(id),
        title: original_title,
        poster: getImagePath(poster_path),
        backdrop: getBackdropPath(backdrop_path),
        rating: vote_average,
        description: overview,
        releaseDate: new Date(release_date).toISOString().substring(0, 10),
        genres: genre_ids.map((id) => genres[id]),
      })
    );
    return movies;
  } catch (e) {
    console.log("error fetching data");
    return [];
  }
};
