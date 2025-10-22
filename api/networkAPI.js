const axios = require('axios');
const coinsUrl = process.env.PROD_URL_EC2+"v1/api/network/";

// /getTopCoins
export const getTopNetworkDetailsAPICall =  async ()=>{
    try{
        const resp =  await axios.post(`${coinsUrl}getTopNetworkDetails`);
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting getTopNetworkDetails api call "+e);
    }
}



