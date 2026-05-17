"use client";
import SectionCard from "@/ui/sectionCard/SectionCard";
import { getRecommendations } from "@/hooks/recommendations/Recommendations";
import { useParams } from "next/navigation";

export default function Recommendations() {
  const { id } = useParams();
  const { data: recommendationMovies = [], isLoading } = getRecommendations(id as string);

  if (!recommendationMovies.length && !isLoading) return null;

  return (
    <SectionCard
      title="Recommendations"
      dataA={recommendationMovies}
      isLoadingA={isLoading}
      typeA="movie"
    />
  );
}
