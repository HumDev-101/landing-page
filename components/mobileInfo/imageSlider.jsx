import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getCollectionByKey, getCategoryCollection } from '../../api/nftsApi';
import LoadingCardComp from '../../components/dex/LoadingCard';
import { useRouter } from 'next/navigation';
import { getPhoneRegEx } from '../../api/devicesAPI';
import { getAICarousel } from '../../api/aiAPI';

const ImageSlider = ({ categories, type, collectionList, setCollectionList }) => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const [category, setCategory] = useState(categories[0]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleBtnClick = async (cat) => {
    if (type === 'brand') {
      const collectionData = await getPhoneRegEx(cat);
      setCategory(cat);
      setCollectionList(collectionData);
    } else {
      const collectionData = await getCategoryCollection(cat, 8, 1);
      setCategory(cat);
      setCollectionList(collectionData);
    }
  };

  const handleCollectionClick = async (key, chainType) => {
    try {
      if (type === 'ai') {
        router.push(`/llm?llmModel=${key}&name=${chainType}`);
      } else if (type === 'brand') {
        router.push(`device/?deviceId=${key}`);
      } else {
        await getCollectionByKey(key, chainType);
        router.push(`/collection?key=${key}&chain=${chainType}`);
      }
    } catch (error) {
      console.error('Error fetching collection details:', error);
    }
  };

  useEffect(() => {
    if (type === 'ai') {
      getAICarousel("all").then(setCollectionList);
    }
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 400);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    let interval;
    if (isSmallScreen) {
      interval = setInterval(() => {
        setCategory((prev) => {
          const currentIndex = categories.indexOf(prev);
          const nextIndex = (currentIndex + 1) % categories.length;
          handleBtnClick(categories[nextIndex]);
          return categories[nextIndex];
        });
      }, 5000);
    }
    return () => interval && clearInterval(interval);
  }, [isSmallScreen]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: type === 'brand' ? 6 : 4,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto p-5 bg-black text-gray-100 relative">
      {/* Categories */}
      {categories && type !== "ai" && (
        <nav className="flex flex-wrap gap-3 mb-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleBtnClick(cat)}
              className={`cursor-pointer rounded-lg px-3 py-1 text-sm sm:text-lg transition 
                ${category === cat ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 hover:bg-gray-300'}`}
            >
              {cat}
            </div>
          ))}
        </nav>
      )}

      {/* Arrows */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-3 bg-white/60 rounded-full hover:bg-white/80"
      >
        <FaArrowLeft className="text-xl text-black" />
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-3 bg-white/60 rounded-full hover:bg-white/80"
      >
        <FaArrowRight className="text-xl text-black" />
      </button>

      {/* Loading */}
      {!collectionList && (
        <div className="flex justify-center items-center min-h-[500px]">
          <LoadingCardComp width="90vw" height="500px" />
        </div>
      )}

      {/* Slider */}
      {collectionList && (
        <Slider ref={sliderRef} {...settings}>
          {collectionList.map((collection, index) => (
            <div
              key={index}
              onClick={() =>
                handleCollectionClick(
                  type === "ai" ? collection.modelName :
                  type === "brand" ? collection._id : collection.blockSpanKey,
                  type === "ai" ? collection.name :
                  type === "brand" ? "" : collection.chainType
                )
              }
              className="p-4 cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src={type === "ai"
                  ? process.env.AI_PROD_URL + collection.image
                  : type === "brand"
                  ? collection.image
                  : collection.coverImage}
                alt={`Slide ${index}`}
                className={`${type === 'brand' ? 'h-auto' : 'h-[400px]'} w-full object-cover rounded-lg`}
              />

              {/* Overlay */}
              <div className="absolute bottom-4 left-[10%] bg-black/70 text-white p-3 rounded text-sm w-[80%]">
                {type === "ai" && (
                  <>
                    {collection?.name && (
                      <p>Name: {collection.name.length > 20 ? `${collection.name.substring(0, 15)}...` : collection.name}</p>
                    )}
                    {collection?.description && (
                      <p>{collection.description.length > 300
                        ? `${collection.description.substring(0, 300)}...`
                        : collection.description}</p>
                    )}
                  </>
                )}
                {type === "brand" && (
                  <>
                    {collection?.brand && (
                      <p>Name: {collection.brand.length > 20 ? `${collection.brand.substring(0, 15)}...` : collection.brand}</p>
                    )}
                    {collection?.misc?.price && (
                      <p>Average price: ${collection.misc.price}</p>
                    )}
                  </>
                )}
                {!type && (
                  <>
                    {collection?.name && (
                      <p>Name: {collection.name.length > 20 ? `${collection.name.substring(0, 15)}...` : collection.name}</p>
                    )}
                    {collection?.averagePriceInDollar && (
                      <p>Average price: ${parseFloat(collection.averagePriceInDollar).toFixed(2)}</p>
                    )}
                    {collection?.totalVolume && (
                      <p>Total Volume: {parseFloat(collection.totalVolume).toFixed(2)}</p>
                    )}
                    {collection?.chainType && (
                      <p>Chain: {collection.chainType === 'eth-main' ? "Ethereum" : "Polygon"}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ImageSlider;
