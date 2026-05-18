import { API_KEY } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetVideos = (id: string, mediaType: "movie" | "tv" = "movie") => {
  return useQuery({
    queryKey: ["videos", mediaType, id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}`
      );
      return data.results;
    },
    enabled: !!id,
  });
};