import { API_KEY } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetdRated = () => {
        return useQuery({
    queryKey: ["topRated"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
        
      );
      return data.results;
    },
  });
}