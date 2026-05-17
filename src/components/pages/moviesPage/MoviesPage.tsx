
import MovieCard from "@/ui/moviePage/MovieCard";
import scss from "./MoviesPage.module.scss";
import { useAllMovies } from "@/hooks/getMovies/getAllMovies";

export default function MoviesPage() {
  const {data: allMovies , isLoading} = useAllMovies()
  return (
   <MovieCard title="Explore Movies" data={allMovies}  isLoading={isLoading}/>
  );
}