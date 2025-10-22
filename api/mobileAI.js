const axios = require('axios');
const aiUrl = process.env.AI_PROD_URL+"/mobile";
const colUrl = process.env.AI_PROD_URL+"/collection";

export const getDeviceReviews = async (deviceId) => { 
    try{
        const resp =  await axios.post(`${aiUrl}/getDeviceReview`,{deviceId:deviceId});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}



export const getCollectionReviews = async (key,chain) => { 
    try{
        const resp =  await axios.post(`${colUrl}/getCollectionReview`,{key:key,chain:chain});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}

export const getCollectionReviews1D = async (key,chain) => { 
    try{
        const resp =  await axios.post(`${colUrl}/getCollectionReview1D`,{key:key,chain:chain});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}