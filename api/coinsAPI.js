const axios = require('axios');
const coinsUrl = process.env.PROD_URL_EC2+"v1/api/coin/";

// /getTopCoins
export const getTopCoinsAPICall =  async ()=>{
    try{
        const resp =  await axios.post(`${coinsUrl}getTopCoins`);
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
    }
}


export const getCoinGraph = async (symbol,timeFrame) =>{
    try{
        const resp =  await axios.post(`${coinsUrl}getGraph`,{symbol: symbol+"USDT",timeFrame: timeFrame});
        resp.data.data.plotList =  resp.data.data.plotList.map((plot)=>{plot.date= (new Date(plot.date)).toString().substring(0,25);return plot})
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
    }
}


export const getCoinAnalytics = async (symbol,timeFrame) =>{
    try{
        const resp =  await axios.post(`${coinsUrl}getCoinAnalytics`,{symbol: symbol});
        console.log(resp.data);
        return resp.data.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return null;
    }
}
