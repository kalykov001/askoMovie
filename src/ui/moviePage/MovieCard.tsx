import { genres, sortMovies } from "@/constants/coman";
import Carded from "../carded/Carded";
import scss from "./MovieCard.module.scss";

interface IMovie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  original_title: string;
}

interface MovieCardProps {
  title: string;
  data: IMovie[] | undefined;
  isLoading: boolean;
}

export default function MovieCard({ title, data = [], isLoading }: MovieCardProps) {
  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.contentWrapper}>
            <div className={scss.cardTop}>
              <h3>{title}</h3>
            </div>
            <div className={scss.blockCard}>
              {isLoading ? (
                <h3>Loading...</h3>
              ) : (
                data.map((item) => <Carded key={item.id} movie={item} type="movie" />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
