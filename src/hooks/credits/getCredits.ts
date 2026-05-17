import { API_KEY } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getCredits = (id: number | string) => {
     return useQuery({
    queryKey: ["popular" , id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      return data;
    },
  });
}