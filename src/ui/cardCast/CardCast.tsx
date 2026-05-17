import scss from "./cardCast.module.scss";
export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
interface CastedProps {
  cast: ICast;
}
export default function CardCast({ cast }: CastedProps) {
  return (
    <div key={cast.id} className={scss.card}>
      <img
        src={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
            : "https://movie.elcho.dev/assets/avatar-k3nP4nO-.png"
        }
        alt=""
      />
      <h4>{cast.name}</h4>
      <h5>{cast.character}</h5>
    </div>
  );
}