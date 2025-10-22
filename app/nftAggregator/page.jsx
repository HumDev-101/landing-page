"use client";
import { useEffect, useState } from "react";
import NFTCarousel from "../../components/mobileInfo/deviceCarousel";
import LoadingCardComp from '../../components/dex/LoadingCard';
import { getAllTopCollections, getCategoryCollection } from "../../api/nftsApi";
import NFTCarouselNotable from "../../components/nft/NFTCarouselNotable";
import TopCollections from "../../components/nft/TopCollections";
import SearchCollection from "../../components/search/searchCollection";

export default function Collections({ page, setPage }) {
  const [gamingCollections, setGamingCollections] = useState(null);
  const [artCollections, setArtCollections] = useState(null);
  const [collectionList, setCollectionList] = useState(null);
  const [topCollections, setTopCollections] = useState(null);
  const [pfpCollections, setPFPCollections] = useState(null);

  useEffect(() => {
    getCategoryCollection("GAMING", 8, 2).then(setGamingCollections);
    getCategoryCollection("ART", 8, 1).then(setArtCollections);
    getCategoryCollection("PFP", 8, 1).then(setPFPCollections);
    getCategoryCollection("ART", 8, 1).then(setCollectionList);

    getAllTopCollections({
      chain: "eth-main",
      ranking: "total_volume",
    })
      .then((data) => {
        setTopCollections(data.topCollectionsList);
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
  }, []);

  if (
    !gamingCollections ||
    !artCollections ||
    !collectionList ||
    !topCollections ||
    !pfpCollections
  ) {
    return (
      <LoadingCardComp
        width={"90vw"}
        height={"70vh"}
        mobileWidth={"85vw"}
        mobileHeight={"100vh"}
        maxHeight={"110vh"}
      />
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-black text-gray-100 font-sans">
      {/* Search */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <SearchCollection />
      </div>

      {/* NFT Carousel */}
      <div className="mt-6">
        <NFTCarousel
          categories={[
            "ART",
            "GAMING",
            "MEMBERSHIP",
            "PFP",
            "PHOTOGRAPHY",
            "MUSIC",
          ]}
          collectionList={collectionList}
          setCollectionList={setCollectionList}
        />
      </div>

      {/* Top Collections */}
      <div className="mt-10">
        <TopCollections
          collections={topCollections}
          collectionsData={topCollections}
          setCollectionsData={setTopCollections}
          setCollections={setTopCollections}
        />
      </div>

      {/* Trending Sections */}
      <div className="mt-10 space-y-10">
        <NFTCarouselNotable heading={"Trending in Gaming"} dataList={gamingCollections} />
        <NFTCarouselNotable heading={"Trending in Art"} dataList={artCollections} />
        <NFTCarouselNotable heading={"Trending in PFPs"} dataList={pfpCollections} />
      </div>

      <div className="h-10" />
    </div>
  );
}
