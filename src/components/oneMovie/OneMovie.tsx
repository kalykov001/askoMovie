"use client";
import { getCredits } from "@/hooks/credits/getCredits";
import AboutMovie from "../pages/aboutMovie/AboutMovie";
import scss from "./oneMovie.module.scss";
import CardCast, { ICast } from "@/ui/cardCast/CardCast";
import { useParams } from "next/navigation";
import Similar from "../pages/similar/Similar";
import Recommendations from "../pages/recommendations/Recommendations";
export default function OneMovie() {
  const { id } = useParams();
  const { data: actors } = getCredits(id as string);
  return (
    <div className={scss.container}>
      <AboutMovie />
      <div className="container">
        <div className={scss.topCast}>
          <h2>Top Cast</h2>
          <div className={scss.list}>
            {actors?.cast.map((item: ICast, idx: number) => (
              <CardCast key={idx} cast={item} />
            ))}
          </div>
        </div>
        <Similar />
        <Recommendations/>
      </div>
    </div>
  );
}
