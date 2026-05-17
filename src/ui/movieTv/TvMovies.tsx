"use client";
import scss from "./tvMovies.module.scss";
import { useRouter } from "next/navigation";
import { genres } from "@/constants/coman";

interface ITVShow {
  id: number;
  poster_path: string | null;
  name: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface TvMoviesProps {
  shows: ITVShow[];
}

export default function TvMovies({ shows }: TvMoviesProps) {
  const { push } = useRouter();

  return (
    <div className={scss.container}>
      <div className={scss.list}>
        {shows?.map((item) => (
          <div
            key={item.id}
            onClick={() => push(`/tv/${item.id}`)}
            className={scss.card}
          >
            <div className={scss.imageWrapper}>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "https://movie.elcho.dev/assets/no-poster-4xa9LmsT.png"
                }
                alt={item.name}
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
              {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
            </h3>
            <h4>{item.first_air_date?.slice(0, 4)}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
