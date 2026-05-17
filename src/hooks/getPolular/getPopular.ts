"use client";
import { API_KEY } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetPopularParams {
  movieType: "movie" | "tv";
}

export const useGetPopular = ({ movieType }: GetPopularParams) => {
  return useQuery({
    queryKey: ["popular", movieType],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${movieType}/popular?api_key=${API_KEY}&language=en-US`
      );
      return data.results;
    },
  });
};
