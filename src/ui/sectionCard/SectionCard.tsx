"use client";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import scss from "./sectionCard.module.scss";
import Carded from "../carded/Carded";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface IMovie {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  original_title?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
}

interface SectionCardProps {
  title: string;
  toggle?: [string, string];
  dataA: IMovie[];
  dataB?: IMovie[];
  isLoadingA?: boolean;
  isLoadingB?: boolean;
  typeA?: "movie" | "tv";
  typeB?: "movie" | "tv";
}

export default function SectionCard({
  title,
  toggle,
  dataA,
  dataB = [],
  isLoadingA,
  isLoadingB,
  typeA = "movie",
  typeB = "movie",
}: SectionCardProps) {
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const currentData = activeTab === 0 ? dataA : dataB;
  const isLoading = activeTab === 0 ? isLoadingA : isLoadingB;
  const currentType = activeTab === 0 ? typeA : typeB;

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    swiperRef.current?.slideTo(0);
  };

  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.cardTop}>
            <h3>{title}</h3>
            {toggle && (
              <div className={scss.switchingTabs}>
                {toggle.map((tab, idx) => (
                  <span
                    key={idx}
                    className={activeTab === idx ? scss.tabItemActive : scss.tabItem}
                    onClick={() => handleTabChange(idx)}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={scss.blockCard}>
            {isLoading ? (
              <div className={scss.loading}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={scss.skeleton} />
                ))}
              </div>
            ) : (
              <div className={scss.swiperWrapper}>
                <button
                  className={`${scss.navBtn} ${scss.navPrev}`}
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <FaRegArrowAltCircleLeft size={22} />
                </button>
                <Swiper
                  modules={[Navigation]}
                  onSwiper={(swiper) => { swiperRef.current = swiper; }}
                  spaceBetween={16}
                  slidesPerView={2}
                  slidesPerGroup={2}
                  breakpoints={{
                    480: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 16 },
                    768: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 24 },
                  }}
                >
                  {currentData?.map((item, idx) => (
                    <SwiperSlide key={item.id ?? idx}>
                      <Carded movie={item} type={currentType} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  className={`${scss.navBtn} ${scss.navNext}`}
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <FaRegArrowAltCircleRight size={22} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
