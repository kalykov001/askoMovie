"use client";
import SectionCard from "@/ui/sectionCard/SectionCard";
import { getSimilar } from "@/hooks/similar/GetSimilar";
import { useParams } from "next/navigation";

export default function Similar() {
  const { id } = useParams();
  const { data: similarMovie = [], isLoading } = getSimilar(id as string);

  if (!similarMovie.length && !isLoading) return null;

  return (
    <SectionCard
      title="Similar Movies"
      dataA={similarMovie}
      isLoadingA={isLoading}
      typeA="movie"
    />
  );
}
