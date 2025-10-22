import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import LoadingCardComp from '../../components/dex/LoadingCard';
import { useRouter } from 'next/navigation';

export default function DeviceCarousel({ heading, dataList }) {
  const router = useRouter();
  const sliderRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(5);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
    afterChange: (current) => setCurrentSlide(current),
  };

  const handleCollectionClick = (key) => {
    router.push(`/device?deviceId=${key}`);
  };

  useEffect(() => {
    if (dataList) setSlidesCount(dataList.length);

    const updateVisibleSlides = () => {
      if (window.innerWidth < 600) setVisibleSlides(1);
      else if (window.innerWidth < 1024) setVisibleSlides(2);
      else setVisibleSlides(4);
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, [dataList]);

  return (
    <div className="w-full max-w-[1920px] mx-auto relative mt-12 bg-black text-gray-200">
      {/* Heading */}
      <nav className="flex justify-start items-center px-5 py-3 mb-3">
        <div className="mr-5 text-2xl font-bold cursor-pointer hover:bg-gray-800 rounded px-3 py-1">
          {heading}
        </div>
      </nav>

      {/* Left Arrow */}
      <div
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute top-1/2 left-3 -translate-y-1/2 z-10 cursor-pointer text-2xl bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
      >
        <FaArrowLeft />
      </div>

      {/* Right Arrow */}
      <div
        onClick={() => sliderRef.current.slickNext()}
        className="absolute top-1/2 right-3 -translate-y-1/2 z-10 cursor-pointer text-2xl bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
      >
        <FaArrowRight />
      </div>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {!dataList && <LoadingCardComp />}
        {dataList &&
          dataList.map((collection, index) => (
            <div
              key={index}
              onClick={() => handleCollectionClick(collection._id)}
              className="flex justify-center items-center p-2"
            >
              <div className="bg-gray-900 rounded-lg p-3 text-center flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105">
                <img
                  src={collection.image}
                  alt={`Slide ${index}`}
                  className="h-48 w-auto object-cover rounded-lg"
                />
                <div className="mt-3">
                  <h3 className="text-lg font-semibold">{collection.brand}</h3>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
