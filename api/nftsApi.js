const nftUrl = process.env.PROD_URL_EC2+"v1/nft/";
const axios = require("axios");

const chainTypesList = [
    {
        "chain":"eth-main",
        "ranking":"one_day_volume"
    },
    {
        "chain":"eth-main",
        "ranking":"seven_day_volume"
    },
    {
        "chain":"eth-main",
        "ranking":"thirty_day_volume"
    },
    {
        "chain":"eth-main",
        "ranking":"total_volume"
    },
    {
        "chain":"eth-main",
        "ranking":"one_day_sales"
    },
    {
        "chain":"eth-main",
        "ranking":"seven_day_sales"
    },
    {
        "chain":"eth-main",
        "ranking":"thirty_day_sales"
    },
    {
        "chain":"eth-main",
        "ranking":"total_sales"
    },
    {
        "chain":"eth-main",
        "ranking":"one_day_average_price"
    },
    {
        "chain":"eth-main",
        "ranking":"seven_day_average_price"
    },
    {
        "chain":"eth-main",
        "ranking":"thirty_day_average_price"
    },
    {
        "chain":"eth-main",
        "ranking":"total_average_price"
    },

    


    //

    {
        "chain":"poly-main",
        "ranking":"one_day_volume"
    },
    {
        "chain":"poly-main",
        "ranking":"seven_day_volume"
    },
    {
        "chain":"poly-main",
        "ranking":"thirty_day_volume"
    },
    {
        "chain":"poly-main",
        "ranking":"total_volume"
    },
    {
        "chain":"poly-main",
        "ranking":"one_day_sales"
    },
    {
        "chain":"poly-main",
        "ranking":"seven_day_sales"
    },
    {
        "chain":"poly-main",
        "ranking":"thirty_day_sales"
    },
    {
        "chain":"poly-main",
        "ranking":"total_sales"
    },
    {
        "chain":"poly-main",
        "ranking":"one_day_average_price"
    },
    {
        "chain":"poly-main",
        "ranking":"seven_day_average_price"
    },
    {
        "chain":"poly-main",
        "ranking":"thirty_day_average_price"
    },
    {
        "chain":"poly-main",
        "ranking":"total_average_price"
    },
    

]

export const getCategoryCollection =  async (category,pageSize,pageNumber)=>{
    try{
        const resp =  await axios.post(`${nftUrl}getCategoryCollections`,{category,pageSize,pageNumber});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
    }
}

export const getAllTopCollections = async (chainTypes)=>{
    try{
        const resp =  await axios.post(`${nftUrl}getAllTopCollections`,chainTypes);
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
    }
}

export const getCollectionByKey = async (key,chain)=>{
    try{
        const resp =  await axios.post(`${nftUrl}getCollectionByKey`,{key:key,chain: chain});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
    }
}
export const getNFTsofCollection = async (contract_address,chain)=>{
    try{
        const resp =  await axios.post(`${nftUrl}getNFTsofCollection`,{contract_address,chain});
        console.log("get NFTs details from collection:",resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
    }
}
export const getSingleNFT = async (contract_address,token_id ,chain)=>{
    try{
        const resp =  await axios.post(`${nftUrl}getSingleNFT`,{contract_address,token_id,chain});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
    }
}
export const getGamingCollections = async (pageSize,pageNumber)=>{
    try{
        const resp =  await axios.post(`${nftUrl}getGamingCollections`,{pageSize,pageNumber});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
    }
}

export const searchCollection = async (searchValue)=>{
    try{
        const resp =  await axios.post(`${nftUrl}searchCollection`,{searchValue});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
    }
}

