import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoadingCardComp from '../../components/dex/LoadingCard';
import axios from 'axios';

export default function TopCollections({ type, collectionsData, setCollectionsData, collections, setCollections }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Top');
  const [activeTime, setActiveTime] = useState('1D');
  const [activeChain, setActiveChain] = useState('Ethereum');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeMap = {
    '1D': 'one_day_volume',
    '7D': 'seven_day_volume',
    '30D': 'thirty_day_volume',
    'Total': 'total_volume'
  };

  const chainMap = {
    'Ethereum': '',
    'Polygon': 'poly'
  };

  useEffect(() => {
    const fetchCollectionsData = async (time, chain) => {
      setLoading(true);
      setError(null);

      const rankDeterminingType =
        activeChain === 'Ethereum'
          ? `${timeMap[time]}`
          : `${timeMap[time]}_${chainMap[chain]}`;

      try {
        const response = await axios.get(
          `${process.env.PROD_URL_EC2}api/topCollections/${rankDeterminingType}`
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          const topCollectionsList = response.data[0].topCollectionsList;
          setCollectionsData(Array.isArray(topCollectionsList) ? topCollectionsList : []);
        } else {
          setCollectionsData([]);
        }
      } catch (error) {
        setError('Failed while fetching collections data.');
        setCollectionsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionsData(activeTime, activeChain);
  }, [activeTime, activeChain]);

  const handleCollectionClick = (key, chainType) => {
    router.push(`/collection?key=${key}&chain=${chainType}`);
  };

  return (
    <>
      {!collections && (
        <div className="flex justify-center items-center w-full mt-8">
          <div className="w-4/5 max-w-screen-xl">
            <LoadingCardComp width="100%" />
          </div>
        </div>
      )}

      {collections && (
        <div className="relative w-[90vw] max-w-screen-xl top-[5vh] mx-auto text-white">
          <h1 className="text-left text-2xl font-bold mb-6 ml-2">
            {type === 'devices' ? 'Devices' : 'Top NFT Collections'}
          </h1>

          {!type && (
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center ml-2 mb-6">
              {/* Chain Toggle */}
              <div
                className="flex border border-gray-600 rounded-lg overflow-hidden cursor-pointer"
                onClick={() =>
                  setActiveChain(activeChain === 'Ethereum' ? 'Polygon' : 'Ethereum')
                }
              >
                <div
                  className={`px-4 py-2 transition ${
                    activeChain === 'Ethereum'
                      ? 'bg-black text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Ethereum
                </div>
                <div
                  className={`px-4 py-2 transition ${
                    activeChain === 'Polygon'
                      ? 'bg-black text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Polygon
                </div>
              </div>

              {/* Time Toggle */}
              <div className="flex border border-gray-600 rounded-lg overflow-hidden cursor-pointer">
                {['1D Volume', '7D Volume', '30D Volume', 'Total Volume'].map((time) => (
                  <div
                    key={time}
                    className={`px-3 py-2 transition ${
                      activeTime === time.split(' ')[0] ||
                      (activeTime === 'Total' && time === 'Total Volume')
                        ? 'bg-black text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                    onClick={() =>
                      setActiveTime(time === 'Total Volume' ? 'Total' : time.split(' ')[0])
                    }
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tables */}
          <div className="flex flex-col lg:flex-row gap-8 mb-6">
            <div className="w-full">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr className="border-b border-gray-600 text-gray-300">
                    {type === 'devices' ? (
                      <>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">CPU</th>
                        <th className="px-3 py-2">GPU</th>
                        <th className="px-3 py-2">RAM</th>
                        <th className="px-3 py-2">Storage</th>
                        <th className="px-3 py-2">Display</th>
                        <th className="px-3 py-2">Operating System</th>
                        <th className="px-3 py-2">Price</th>
                      </>
                    ) : (
                      <>
                        <th className="px-3 py-2 w-16">Rank</th>
                        <th className="px-3 py-2">Collection</th>
                        <th className="px-3 py-2">1D Vol</th>
                        <th className="px-3 py-2">7D Vol</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {collectionsData.slice(0, 8).map((collection, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-800 transition"
                      onClick={() =>
                        handleCollectionClick(collection.blockSpanKey, collection.chainType)
                      }
                    >
                      {type === 'devices' ? (
                        <>
                          <td className="px-3 py-2 flex items-center gap-2">
                            <img
                              src={collection.image}
                              alt={collection.brand}
                              className="w-10 h-10 rounded-md"
                            />
                            <span>{collection.name}</span>
                          </td>
                          <td className="px-3 py-2">
                            {parseFloat(collection.oneDayVolumeEth).toFixed(2)}
                          </td>
                          <td className="px-3 py-2">
                            {parseFloat(collection.sevenDayVolumeEth).toFixed(2)}
                          </td>
                          <td className="px-3 py-2">
                            {parseFloat(collection.sevenDayVolumeEth).toFixed(2)}
                          </td>
                          <td className="px-3 py-2">
                            {parseFloat(collection.sevenDayVolumeEth).toFixed(2)}
                          </td>
                          <td className="px-3 py-2">Display</td>
                          <td className="px-3 py-2">Operating System</td>
                          <td className="px-3 py-2">Price</td>
                        </>
                      ) : (
                        <>
                          <td className="px-3 py-2">{index + 1}</td>
                          <td className="px-3 py-2 flex items-center gap-2">
                            <img
                              src={collection.coverImage}
                              alt={collection.name}
                              className="w-10 h-10 rounded-md"
                            />
                            <span>{collection.name}</span>
                          </td>
                          <td className="px-3 py-2">
                            {parseFloat(collection.oneDayVolumeEth).toFixed(2)}
                          </td>
                          <td className="px-3 py-2">
                            {parseFloat(collection.sevenDayVolumeEth).toFixed(2)}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!type && (
              <div className="w-full hidden md:block">
                <table className="w-full border-collapse table-auto">
                  <thead>
                    <tr className="border-b border-gray-600 text-gray-300">
                      <th className="px-3 py-2 w-16">Rank</th>
                      <th className="px-3 py-2">Collection</th>
                      <th className="px-3 py-2">1D Vol</th>
                      <th className="px-3 py-2">7D Vol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectionsData.slice(8, 16).map((collection, index) => (
                      <tr
                        key={index}
                        className="cursor-pointer hover:bg-gray-800 transition"
                        onClick={() =>
                          handleCollectionClick(collection.blockSpanKey, collection.chainType)
                        }
                      >
                        <td className="px-3 py-2">{index + 9}</td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          <img
                            src={collection.coverImage}
                            alt={collection.name}
                            className="w-10 h-10 rounded-md"
                          />
                          <span>{collection.name}</span>
                        </td>
                        <td className="px-3 py-2">
                          {parseFloat(collection.oneDayVolumeEth).toFixed(2)}
                        </td>
                        <td className="px-3 py-2">
                          {parseFloat(collection.sevenDayVolumeEth).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
