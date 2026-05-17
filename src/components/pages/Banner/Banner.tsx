"use client";
import { Typewriter } from "react-simple-typewriter";
import scss from "./banner.module.scss";
import { useAllMovies } from "@/hooks/getMovies/getAllMovies";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchMovies } from "@/hooks/search/GetSeatch";

export default function Banner() {
  const { data } = useAllMovies();
  const { push } = useRouter();
  const [query, setQuery] = useState("");

  const randomMovie =
    data && data.length > 0
      ? data[Math.floor(Math.random() * data.length)]
      : null;

  const text = [
    "Welcome to AskoMovie - Enjoy the Show!",
    "Discover Movie Magic at AskoMovie",
    "Get Ready for Cinematic Bliss",
  ];

  const { data: searchResults } = useSearchMovies(query);

  const handleSearch = () => {
    if (query.trim()) {
      push(`/search?query=${query}`);
    }
  };
  
  return (
    <div
      style={{
        background: `linear-gradient(rgba(4, 21, 45, 0.34), rgba(4, 21, 45, 1)),url(https://image.tmdb.org/t/p/original${randomMovie?.backdrop_path}) center/cover no-repeat`,
      }}
      className={scss.container}
    >
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.app}>
            <h1>
              <Typewriter
                words={text}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={90}
                deleteSpeed={30}
                delaySpeed={1000}
              />
            </h1>
          </div>
          <p>
            Millions of movies, TV shows and people to discover. Explore now.
          </p>

          <div className={scss.searchBar}>
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}
