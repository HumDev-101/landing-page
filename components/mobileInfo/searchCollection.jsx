import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SearchCollection({ type }) {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue.length >= 2) {
        try {
          if (type === 'devices') {
            const response = await axios.post(
              `${process.env.PROD_URL_EC2}api/searchDevice`,
              { searchValue, pageSize: 5, pageNumber: 1 }
            );
            setSuggestions(response.data);
          } else {
            const response = await axios.post(
              `${process.env.PROD_URL_EC2}v1/nft/searchCollection`,
              { searchValue, pageSize: 5, pageNumber: 1 }
            );
            setSuggestions(response.data);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchValue, type]);

  const handleSuggestionClick = (key, chainType) => {
    try {
      if (type === 'devices') {
        router.push(`/device?deviceId=${key}`);
      } else {
        router.push(`/collection?key=${key}&chain=${chainType}`);
      }
      setSearchValue('');
    } catch (error) {
      console.error('Error fetching collection details:', error);
    }
  };

  return (
    <div className="relative w-full h-10 sm:h-8 flex justify-center items-center bg-gray-900 text-white">
      <div>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder={type === 'devices' ? 'Search Devices' : 'Search Collections'}
          className="px-3 py-2 w-[500px] sm:w-[275px] h-[35px] sm:h-[25px] text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none text-sm sm:text-xs placeholder-gray-400"
        />
      </div>

      {suggestions.length > 0 && (
        <ul
          className="absolute top-[calc(100%+5px)] sm:top-6 left-1/2 -ml-[260px] sm:-ml-[145px] w-[500px] sm:w-[275px] 
          bg-gray-800 text-white shadow-lg rounded-md z-50 list-none py-2"
        >
          {type !== 'devices' &&
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() =>
                  handleSuggestionClick(suggestion.blockSpanKey, suggestion.chainType)
                }
                className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      suggestion?.coverImage !== 'null'
                        ? suggestion.coverImage
                        : '/noimgavail1.png'
                    }
                    width={20}
                    height={20}
                    className="rounded"
                    alt="collection"
                  />
                  <div>{suggestion.name}</div>
                </div>
              </li>
            ))}

          {type === 'devices' &&
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion._id, '')}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      suggestion?.image !== 'null'
                        ? suggestion.image
                        : '/noimgavail1.png'
                    }
                    width={20}
                    height={20}
                    className="rounded"
                    alt="device"
                  />
                  <div>{suggestion.brand}</div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
