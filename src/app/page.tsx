"use client";
import Banner from "@/components/pages/Banner/Banner";
import Polular from "@/components/pages/popular/Polular";
import TopRated from "@/components/pages/topReted/topRated";
import Trending from "@/components/pages/trending/Trending";

const page = () => {
  return (
    <div>
      <Banner />
      <Trending/>
      <Polular/>
      <TopRated/>
    </div>
  );
};

export default page;
