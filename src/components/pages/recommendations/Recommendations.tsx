"use client";
import SectionCard from "@/ui/sectionCard/SectionCard";
import { getRecommendations } from "@/hooks/recommendations/Recommendations";
import { useParams, usePathname } from "next/navigation";

export default function Recommendations() {
  const { id } = useParams();
  const pathname = usePathname();
  const mediaType = pathname.includes("/tv/") ? "tv" : "movie";
  const { data: recommendationMovies = [], isLoading } = getRecommendations(id as string, mediaType);

  if (!recommendationMovies.length && !isLoading) return null;

  return (
    <SectionCard
      title="Recommendations"
      dataA={recommendationMovies}
      isLoadingA={isLoading}
      typeA={mediaType}
    />
  );
}
