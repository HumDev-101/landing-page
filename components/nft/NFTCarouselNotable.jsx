"use client";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import LoadingCardComp from "../../components/dex/LoadingCard";
import { useRouter } from "next/navigation";

export default function NFTCarouselNotable({ heading, dataList }) {
  const router = useRouter();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: visibleSlides,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
    afterChange: (current) => setCurrentSlide(current),
  };

  const handleCollectionClick = (key, chainType) => {
    router.push(`/collection?key=${key}&chain=${chainType}`);
  };

  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth < 600) setVisibleSlides(1);
      else if (window.innerWidth < 1024) setVisibleSlides(2);
      else setVisibleSlides(4);
    };
    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 mt-12">
      {/* Heading */}
      <div className="flex items-center justify-start mb-4">
        <h2 className="text-2xl font-bold text-gray-100">{heading}</h2>
      </div>

      {/* Arrows */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 text-gray-200 rounded-full transition"
      >
        <FaArrowLeft size={20} />
      </button>

      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 text-gray-200 rounded-full transition"
      >
        <FaArrowRight size={20} />
      </button>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {!dataList && <LoadingCardComp width={"100vw"} />}
        {dataList &&
          dataList.map((collection, index) => (
            <div
              key={index}
              className="px-3"
              onClick={() =>
                handleCollectionClick(collection.blockSpanKey, collection.chainType)
              }
            >
              <div className="bg-gray-900 rounded-xl shadow-lg p-3 cursor-pointer transition-transform hover:scale-105">
                <img
                  src={collection.coverImage}
                  alt={collection.name}
                  className="w-full h-52 object-cover rounded-lg"
                />
                <div className="mt-3 text-gray-200">
                  <h3 className="text-lg font-semibold truncate">{collection.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center mt-1">
                    Average Price:
                    <span className="ml-2 text-green-400 font-bold">
                      ${parseFloat(collection.averagePriceInDollar).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
