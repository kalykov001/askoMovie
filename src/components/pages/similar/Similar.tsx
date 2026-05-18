"use client";
import SectionCard from "@/ui/sectionCard/SectionCard";
import { getSimilar } from "@/hooks/similar/GetSimilar";
import { useParams, usePathname } from "next/navigation";

export default function Similar() {
  const { id } = useParams();
  const pathname = usePathname();
  const mediaType = pathname.includes("/tv/") ? "tv" : "movie";
  const { data: similarMovie = [], isLoading } = getSimilar(id as string, mediaType);

  if (!similarMovie.length && !isLoading) return null;

  return (
    <SectionCard
      title={mediaType === "tv" ? "Similar TV Shows" : "Similar Movies"}
      dataA={similarMovie}
      isLoadingA={isLoading}
      typeA={mediaType}
    />
  );
}
