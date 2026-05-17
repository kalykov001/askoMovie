"use client";
import SectionCard from "@/ui/sectionCard/SectionCard";
import { useGettrending } from "@/hooks/getMovie/useGetMovie";

export default function Trending() {
  const { data: dayMovies = [], isLoading: isLoadingDay } = useGettrending("day");
  const { data: weekMovies = [], isLoading: isLoadingWeek } = useGettrending("week");

  return (
    <SectionCard
      title="Trending"
      toggle={["Today", "This Week"]}
      dataA={dayMovies}
      dataB={weekMovies}
      isLoadingA={isLoadingDay}
      isLoadingB={isLoadingWeek}
      typeA="movie"
      typeB="movie"
    />
  );
}
