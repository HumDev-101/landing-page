'use client'
//Convert this component page to tailwind css and make it use black background and light color/text. Also remove the ad containers .:
import NFTCarousel from '../../components/mobileInfo/imageSlider';
import { useEffect, useState } from 'react';
import SearchCollection from "../../components/mobileInfo/searchCollection";
import TableComponent from "../../components/mobileInfo/tableComponent";
import DeviceCarousel from "../../components/mobileInfo/deviceCarousel";
import { getDevicesTable, getFlagships, getPhoneRegEx, getPopular, getUnder200Dollars } from "../../api/devicesAPI";
import useWindowResize from '../../components/hooks/useWindowResize';
import LoadingCardComp from '../../components/dex/LoadingCard';
export default function Collections({ page, setPage }) {
  const [gamingCollections, setGamingCollections] = useState(null);
  const [artCollections, setArtCollections] = useState(null);
  const [collectionList, setCollectionList] = useState(null);
  const [tableList, setTableList] = useState(null);
  const [pfpCollections, setPFPCollections] = useState(null);
  const isDesktop = useWindowResize();

  useEffect(() => {
    getUnder200Dollars().then(setGamingCollections);
    getFlagships().then(setArtCollections);
    getPopular().then(setPFPCollections);

    getDevicesTable()
      .then((data) => setTableList(data))
      .catch((error) => console.error("API Error:", error));

    getPhoneRegEx("apple").then(setCollectionList);
  }, []);

  return (
    <div className="min-h-[150vh] mt-[60px] bg-black text-gray-100">
      {(gamingCollections && artCollections && pfpCollections && tableList && collectionList) ? (
        <>
          <SearchCollection type="devices" />
          <NFTCarousel
            collectionList={collectionList}
            setCollectionList={setCollectionList}
            type="brand"
            categories={["Apple", "Xiaomi", "Samsung", "Google", "Motorola", "OnePlus"]}
          />

          <TableComponent
            collections={tableList}
            setCollectionsData={setTableList}
            setCollections={setTableList}
            collectionsData={tableList}
            type="devices"
          />

          <DeviceCarousel heading="Under 200 Dollars" dataList={gamingCollections} />
          <DeviceCarousel heading="Flagships" dataList={artCollections} />
          <DeviceCarousel heading="Popular" dataList={pfpCollections} />
        </>
      ) : (
        <LoadingCardComp
          width="90vw"
          height="70vh"
          mobileWidth="85vw"
          mobileHeight="100vh"
          maxHeight="110vh"
        />
      )}
    </div>
  );
}
