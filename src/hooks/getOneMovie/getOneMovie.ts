import { API_KEY } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useOneMovie = (type = "movie", id: number | string) => {
  return useQuery({
    queryKey: ["trending", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
      );
      return data;
    },
  });
};
