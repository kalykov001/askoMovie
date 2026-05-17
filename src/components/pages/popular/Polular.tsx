"use client";
import SectionCard from "@/ui/sectionCard/SectionCard";
import { useGetPopular } from "@/hooks/getPolular/getPopular";

export default function Polular() {
  const { data: popularMovies = [], isLoading: isLoadingMovies } = useGetPopular({ movieType: "movie" });
  const { data: popularTv = [], isLoading: isLoadingTv } = useGetPopular({ movieType: "tv" });

  return (
    <SectionCard
      title="What's Popular"
      toggle={["Movies", "TV Shows"]}
      dataA={popularMovies}
      dataB={popularTv}
      isLoadingA={isLoadingMovies}
      isLoadingB={isLoadingTv}
      typeA="movie"
      typeB="tv"
    />
  );
}
