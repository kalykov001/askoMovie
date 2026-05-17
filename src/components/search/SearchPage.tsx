"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchMovies } from "@/hooks/search/GetSeatch";
import scss from "./searchPage.module.scss";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("query") || "";
  const { push } = useRouter();
  const { data: movies, isLoading } = useSearchMovies(query);

  if (isLoading) {
    return (
      <div className={scss.container}>
        <div className="container">
          <div className={scss.mainContainer}>
            <h2>Searching for: "{query}"</h2>
            <div className={scss.list}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={scss.skeleton} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <h2>Results for: "{query}"</h2>
          <div className={scss.list}>
            {movies?.length ? (
              movies.map((movie: any) => (
                <div
                  onClick={() => push(`/movie/${movie.id}`)}
                  className={scss.cardSearch}
                  key={movie.id}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                        : "https://movie.elcho.dev/assets/no-poster-4xa9LmsT.png"
                    }
                    alt={movie.title}
                    loading="lazy"
                  />
                  <h3>{movie.title}</h3>
                  <h4>{movie.release_date?.slice(0, 4)}</h4>
                </div>
              ))
            ) : (
              <p className={scss.noResults}>No results found for "{query}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
