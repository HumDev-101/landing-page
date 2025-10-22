import styled from 'styled-components'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCollectionByKey } from '../../api/nftsApi';
import Image from 'next/image';


const MainSearchCont = styled.div`
    width: 100%;
    height: 40px;
    position: relative;

     @media (max-width: 768px) {
      height: 30px;
    }


      .search-bar {
    padding: 10px;
    width: 500px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    height: 35px;
    &:focus{
        outline: none;
    }

    @media (max-width: 768px) {
      width: 275px;
      height: 25px;
      font-size: 10px;
    }
  
  }

      .suggestions-list {
    position: absolute;
    top: calc(100% + 5px);
    left: 50vw;
    margin-left: -260px;
    background: white;
    width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    z-index: 1000;
    list-style: none;
    padding: 10px 0;
    
    @media (max-width: 768px) {
      width: 275px;
      left: 50vw;
      margin-left: -145px;
      top: 25px;
    }
  

    li {
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f0f0f0;
      }
    }

}
      
`;

export default function SearchCollection({type}) {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const router = useRouter();

      useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue.length >= 2) {
        if(type=="devices"){
          const response = await axios.post(
            `${process.env.PROD_URL_EC2}api/searchDevice`,
            {
              searchValue,
              pageSize: 5,
              pageNumber: 1,
            }
          );
          setSuggestions(response.data);
          console.log(response.data);
        }else {
          try {
            const response = await axios.post(
              `${process.env.PROD_URL_EC2}v1/nft/searchCollection`,
              {
                searchValue,
                pageSize: 5,
                pageNumber: 1,
              }
            );
            setSuggestions(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching suggestions:', error);
          }
        }
     
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchValue]);

      const handleSuggestionClick = async (key, chainType) => {
    try {
      if(type=="devices"){
        router.push(`/device?deviceId=${key}`);
      }
      else{
        router.push(`/collection?key=${key}&chain=${chainType}`);
      }
      // const collectionDetails = await getCollectionByKey(key, chainType);
      setSearchValue('');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error fetching collection details:', error);
    }
  };

  return (
    <MainSearchCont className='frcc' >
        <div className="search-div">
           <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-bar"
            type="text"
            placeholder={type=="devices"?"Search Devices":"Search Collections"}
          />
        </div>

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              
              {type!="devices" && suggestions.map((suggestion, index) => (
                
                <li
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion.blockSpanKey,
                      suggestion.chainType
                    )
                  }
                >
                    <div className="col-search-image-cont frfsc g20">
                    <Image src={suggestion?.coverImage!="null"?suggestion.coverImage:"/noimgavail1.png"} width={20} height={20} className='col-search-img rounded' alt="123" />
                    <div className="name">
                    {suggestion.name}
                    </div>
                    </div>
                  
          
                </li>
              ))}


              {type=="devices" && suggestions.map((suggestion, index) => (
                
                <li
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(
                      suggestion._id,
                      ""
                    )
                  }
                >
                    <div className="col-search-image-cont frfsc g20">
                    <Image src={suggestion?.image!="null"?suggestion.image:"/noimgavail1.png"} width={20} height={20} className='col-search-img rounded' alt="123" />
                    <div className="name">
                    {suggestion.brand}
                    </div>
                    </div>
                  
          
                </li>
              ))}
            </ul>
          )}
    </MainSearchCont>
  )
}
