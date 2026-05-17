"use client";
import { useState, useMemo } from "react";
import { genres, sortMovies } from "@/constants/coman";
import scss from "./moviePage.module.scss";
import { useAllMovies } from "@/hooks/getMovies/getAllMovies";
import MoviesCart from "@/ui/moviesCart/MoviesCart";

export default function MoviePage() {
  const { data: allMovies = [] } = useAllMovies();

  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortOption, setSortOption] = useState("all");

  const filteredMovies = useMemo(() => {
    let movies = [...allMovies];

    if (selectedGenre !== "all") {
      const genreId = Number(selectedGenre);
      movies = movies.filter((movie) => movie.genre_ids.includes(genreId));
    }

    if (sortOption === "rating") {
      movies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortOption === "release") {
      movies.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
    } else if (sortOption === "title") {
      movies.sort((a, b) => a.title.localeCompare(b.title));
    }

    return movies;
  }, [allMovies, selectedGenre, sortOption]);

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.movieTop}>
            <h3>Explore Movies</h3>

            <div className={scss.selected}>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="all">All Genres</option>
                {genres.map((item, idx) => (
                  <option key={idx} value={item.id.toString()}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="all" hidden>
                  Sort by
                </option>
                {sortMovies.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <MoviesCart movies={filteredMovies} />
        </div>
      </div>
    </div>
  );
}
