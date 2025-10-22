import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import LoadingCardComp from '../../components/dex/LoadingCard';

export default function TableComponent({ type, collectionsData, setCollections, collections }) {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleCollectionClick = (key) => {
    router.push(`/device?deviceId=${key}`);
  };

  return (
    <>
      {!collections && (
        <div className="flex justify-center items-center w-full mt-8">
          <div className="w-4/5 max-w-screen-xl flex justify-center">
            <LoadingCardComp />
          </div>
        </div>
      )}

      {collections && (
        <div className="w-full bg-black text-gray-200 min-h-screen">
          <div className="max-w-screen-2xl mx-auto px-4 py-6">
            <h1 className="text-left text-white text-2xl font-bold mb-5 ml-6">
              {type === 'devices' ? 'Best Value' : 'Top NFT Collections'}
            </h1>

            <div className="flex flex-col lg:flex-row gap-10 mb-5">
              <div className={`${type === 'devices' ? 'w-full overflow-x-auto' : 'w-full'} px-4`}>
                <table className="w-full border-collapse text-sm md:text-base">
                  <thead>
                    <tr className="bg-gray-800">
                      {type === 'devices' && (
                        <>
                          <th className="py-3 px-4 text-left">Name</th>
                          <th className="py-3 px-4 text-left">CPU</th>
                          <th className="py-3 px-4 text-left">GPU</th>
                          <th className="py-3 px-4 text-left">Size</th>
                          <th className="py-3 px-4 text-left">Display</th>
                          <th className="py-3 px-4 text-left">Operating System</th>
                          <th className="py-3 px-4 text-left">Price</th>
                        </>
                      )}

                      {!type && (
                        <>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Collection</th>
                          <th className="py-3 px-4 text-left">1D Vol</th>
                          <th className="py-3 px-4 text-left">7D Vol</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {collectionsData.slice(0, 8).map((collection, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => handleCollectionClick(collection._id)}
                      >
                        {type === 'devices' && (
                          <>
                            <td className="py-2 px-4">
                              <div className="flex items-center gap-3">
                                <img src={collection.image} alt={collection.brand} className="w-10 h-10 rounded" />
                                <span>{collection.brand}</span>
                              </div>
                            </td>
                            <td className="py-2 px-4">{collection?.platform.cpu}</td>
                            <td className="py-2 px-4">{collection?.platform.gpu}</td>
                            <td className="py-2 px-4">{collection?.display?.size}</td>
                            <td className="py-2 px-4">{collection?.display?.type}</td>
                            <td className="py-2 px-4">{collection.platform.os}</td>
                            <td className="py-2 px-4">{collection.misc.price}</td>
                          </>
                        )}

                        {!type && (
                          <>
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">
                              <div className="flex items-center gap-3">
                                <img src={collection.coverImage} alt={collection.name} className="w-10 h-10 rounded" />
                                <span>{collection.name}</span>
                              </div>
                            </td>
                            <td className="py-2 px-4">{parseFloat(collection.oneDayVolumeEth).toFixed(2)}</td>
                            <td className="py-2 px-4">{parseFloat(collection.sevenDayVolumeEth).toFixed(2)}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!type && (
                <div className="w-full lg:w-1/2 px-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="py-3 px-4 text-left">Rank</th>
                        <th className="py-3 px-4 text-left">Collection</th>
                        <th className="py-3 px-4 text-left">1D Vol</th>
                        <th className="py-3 px-4 text-left">7D Vol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collectionsData.slice(8, 16).map((collection, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => handleCollectionClick(collection.blockSpanKey)}
                        >
                          <td className="py-2 px-4">{index + 9}</td>
                          <td className="py-2 px-4">
                            <div className="flex items-center gap-3">
                              <img src={collection.coverImage} alt={collection.name} className="w-10 h-10 rounded" />
                              <span>{collection.name}</span>
                            </div>
                          </td>
                          <td className="py-2 px-4">{parseFloat(collection.oneDayVolumeEth).toFixed(2)}</td>
                          <td className="py-2 px-4">{parseFloat(collection.sevenDayVolumeEth).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
