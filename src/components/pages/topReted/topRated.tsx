"use client";
import SectionCard from "@/ui/sectionCard/SectionCard";
import { useGetdRated } from "@/hooks/getRated/GetRated";
import { useGetTopTv } from "@/hooks/getTopMovie/useGetTopTv";

export default function TopRated() {
  const { data: topRatedMovies = [], isLoading: isLoadingMovies } = useGetdRated();
  const { data: topRatedTv = [], isLoading: isLoadingTv } = useGetTopTv();

  return (
    <SectionCard
      title="Top Rated"
      toggle={["Movies", "TV Shows"]}
      dataA={topRatedMovies}
      dataB={topRatedTv}
      isLoadingA={isLoadingMovies}
      isLoadingB={isLoadingTv}
      typeA="movie"
      typeB="tv"
    />
  );
}
