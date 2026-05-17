import { API_KEY } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getTv = () => {
  return useQuery({
    queryKey: ["tv"],
    queryFn: async () => {
      const tv = [
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=1`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=2`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=3`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=4`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=5`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=6`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=7`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=8`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=10`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=11`,
      ];
      const response = await Promise.all(tv.map((item) => axios.get(item)));
      const tvMovie = response.flatMap((res) => res.data.results);
      return tvMovie;
    },  
  });
};
