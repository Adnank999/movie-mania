"use client";
import { Recommendations } from "@/models/Recommendations";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; 

interface Props {
  recommendationDetails: Recommendations;
}

const RecommendationCard = ({ recommendationDetails }: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-10">
      <h1 className="text-2xl text-center text-red-600 mb-6">
        Recommended Movies
      </h1>
      <Swiper
        spaceBetween={4}
        slidesPerView={5}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {recommendationDetails.results.map((recommendation) => (
          <SwiperSlide key={recommendation.id}>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={`https://image.tmdb.org/t/p/w300${recommendation.poster_path}`}
                alt={recommendation.original_title}
                width={0}
                height={0}
                className="w-full h-48 rounded-lg object-scale-down"
                unoptimized
              />
              <h2 className="text-center text-lg mt-2">
                {recommendation.original_title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendationCard;
