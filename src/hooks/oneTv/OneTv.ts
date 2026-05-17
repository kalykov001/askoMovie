import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY } from "@/constants/api";

export const useOneTv = (id: string | undefined) => {
  return useQuery({
    queryKey: ["tv", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
      );
      return data;
    },
  });
};
