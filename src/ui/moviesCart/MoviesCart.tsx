"use client";
import scss from "./moviesCart.module.scss";
import { useRouter } from "next/navigation";
import { genres } from "@/constants/coman";

interface IItem {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface MoviesCartProps {
  movies: IItem[];
}

export default function MoviesCart({ movies }: MoviesCartProps) {
  const { push } = useRouter();

  return (
    <div className={scss.container}>
      <div className={scss.list}>
        {movies?.map((item) => (
          <div
            key={item.id}
            onClick={() => push(`/movie/${item.id}`)}
            className={scss.card}
          >
            <div className={scss.imageWrapper}>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "https://movie.elcho.dev/assets/no-poster-4xa9LmsT.png"
                }
                alt={item.title}
                loading="lazy"
              />
              <div className={scss.score}>{item.vote_average.toFixed(1)}</div>
              <div className={scss.genre}>
                {item.genre_ids.slice(0, 2).map((id) => {
                  const genre = genres.find((g) => g.id === id);
                  return genre ? <span key={id}>{genre.name}</span> : null;
                })}
              </div>
            </div>
            <h3>
              {item.title.length > 22 ? item.title.slice(0, 22) + "..." : item.title}
            </h3>
            <h4>{item.release_date?.slice(0, 4)}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
