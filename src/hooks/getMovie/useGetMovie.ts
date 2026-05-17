import { API_KEY } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGettrending = (period: "day" | "week" = "day") => {
  return useQuery({
    queryKey: ["trending", period],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${period}?api_key=${API_KEY}&language=en-US`
      );
      return data.results;
    },
  });
};
