import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY } from "@/constants/api";

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
      );
      return data.results;
    },
  });
};