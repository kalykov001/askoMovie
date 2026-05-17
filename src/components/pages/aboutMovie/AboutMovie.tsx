"use client";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import scss from "./aboutMovie.module.scss";
import { useOneMovie } from "@/hooks/getOneMovie/getOneMovie";
import { getCredits } from "@/hooks/credits/getCredits";
import { useGetVideos } from "@/hooks/getVideos/getVideos";

interface IItem {
  name: string;
  original_name: string;
}

export default function AboutMovie() {
  const pathname = usePathname();
  const params = useParams();
  const id = params.id as string;
  const mediaType = pathname.includes("tv") ? "tv" : "movie";
  const { data: oneMovie } = useOneMovie(mediaType, id);
  const { data: actors } = getCredits(id);
  const { data: videos } = useGetVideos(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatRuntime = (runtime: number) => {
    if (!runtime) return null;
    const h = Math.floor(runtime / 60);
    const m = runtime % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const trailer = videos?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div
      style={{
        background: `linear-gradient(rgba(4, 21, 45, 0.75), rgba(4, 21, 45, 1)), url(https://image.tmdb.org/t/p/original${oneMovie?.backdrop_path}) center/cover no-repeat`,
      }}
      className={scss.container}
    >
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.image}>
            <img
              src={
                oneMovie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`
                  : "https://movie.elcho.dev/assets/no-poster-4xa9LmsT.png"
              }
              alt={oneMovie?.title || oneMovie?.name}
            />
          </div>

          <div className={scss.title}>
            <h2>
              {oneMovie?.title || oneMovie?.name}{" "}
              {(oneMovie?.release_date || oneMovie?.first_air_date) && (
                <span>
                  ({(oneMovie?.release_date || oneMovie?.first_air_date)?.slice(0, 4)})
                </span>
              )}
            </h2>

            {oneMovie?.tagline && <h3>{oneMovie.tagline}</h3>}

            <div className={scss.genre}>
              {oneMovie?.genres?.map((item: IItem, idx: number) => (
                <span key={idx}>{item.name}</span>
              ))}
            </div>

            <div className={scss.videos}>
              <div className={scss.vota}>
                {oneMovie?.vote_average?.toFixed(1)}
              </div>
              {trailer && (
                <div className={scss.watch} onClick={() => setIsModalOpen(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16" fill="white" />
                  </svg>
                  <span>Watch Trailer</span>
                </div>
              )}
            </div>

            <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Overview</h2>
            <p>{oneMovie?.overview}</p>

            <div className={scss.status}>
              {oneMovie?.status && (
                <h5>Status: <span>{oneMovie.status}</span></h5>
              )}
              {(oneMovie?.release_date || oneMovie?.first_air_date) && (
                <h5>
                  {mediaType === "tv" ? "First Air Date" : "Release Date"}:{" "}
                  <span>{oneMovie?.release_date || oneMovie?.first_air_date}</span>
                </h5>
              )}
              {oneMovie?.runtime && (
                <h5>Runtime: <span>{formatRuntime(oneMovie.runtime)}</span></h5>
              )}
            </div>

            <hr />
            {actors?.crew?.length > 0 && (
              <h5>
                Director:
                {actors.crew.slice(0, 1).map((item: IItem, idx: number) => (
                  <span key={idx}> {item?.original_name}</span>
                ))}
              </h5>
            )}
            <hr />
            {actors?.crew?.length > 1 && (
              <h5>
                Writer:
                {actors.crew.slice(1, 3).map((item: IItem, idx: number) => (
                  <span key={idx}> {item.name}</span>
                ))}
              </h5>
            )}
            <hr />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={scss.modale} onClick={() => setIsModalOpen(false)}>
          <div className={scss.block} onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button className={scss.cancel} onClick={() => setIsModalOpen(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
