"use client";
import { useRouter } from "next/navigation";
import scss from "./carded.module.scss";
import { genres } from "@/constants/coman";

interface ICard {
  poster_path: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_title?: string;
}

interface CardedProps {
  movie: ICard;
  type?: "movie" | "tv";
}

export default function Carded({ movie, type = "movie" }: CardedProps) {
  const router = useRouter();
  const displayTitle = movie.title || movie.name || "";
  const displayDate = movie.release_date || movie.first_air_date || "";

  return (
    <div
      onClick={() => router.push(`/${type}/${movie.id}`)}
      className={scss.carded}
    >
      <div className={scss.imageWrapper}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://movie.elcho.dev/assets/no-poster-4xa9LmsT.png"
          }
          alt={displayTitle}
          loading="lazy"
        />
        <div className={scss.ball}>{movie.vote_average.toFixed(1)}</div>
        <div className={scss.genre}>
          {movie.genre_ids.slice(0, 2).map((id) => {
            const genre = genres.find((g) => g.id === id);
            return genre ? <span key={id}>{genre.name}</span> : null;
          })}
        </div>
      </div>
      <h3>
        {displayTitle.length > 20
          ? displayTitle.slice(0, 20) + "..."
          : displayTitle}
      </h3>
      <h4>{displayDate}</h4>
    </div>
  );
}
