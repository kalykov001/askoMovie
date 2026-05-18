import { API_KEY } from "@/constants/api"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const getSimilar = (id: number | string, mediaType: "movie" | "tv" = "movie") => {
    return useQuery({
        queryKey: ["similar", mediaType, id],
        queryFn: async() => {
          const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${API_KEY}`)
          return data.results;
        }
    })
}