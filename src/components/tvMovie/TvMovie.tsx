"use client";
import { useState, useMemo } from "react";
import { genres, sortMovies } from "@/constants/coman";
import scss from "./tvMovie.module.scss";
import TvMovies from "@/ui/movieTv/TvMovies";
import { getTv } from "@/hooks/tvMovie/GetTv";

export default function TvMovie() {
  const { data: tvShows = [] } = getTv();

  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortOption, setSortOption] = useState("all");

  const filteredTvShows = useMemo(() => {
    let shows = [...tvShows];

    if (selectedGenre !== "all") {
      const genreId = Number(selectedGenre);
      shows = shows.filter((show) => show.genre_ids.includes(genreId));
    }
    if (sortOption === "rating") {
      shows.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortOption === "release") {
      shows.sort(
        (a, b) =>
          new Date(b.first_air_date).getTime() -
          new Date(a.first_air_date).getTime()
      );
    } else if (sortOption === "title") {
      shows.sort((a, b) => a.name.localeCompare(b.name));
    }

    return shows;
  }, [tvShows, selectedGenre, sortOption]);

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.tvTop}>
            <h3>Explore TV Shows</h3>

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

          <TvMovies shows={filteredTvShows} />
        </div>
      </div>
    </div>
  );
}
