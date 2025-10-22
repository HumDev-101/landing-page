const axios = require('axios');
const analyticsAPI = process.env.PROD_URL_EC2+"analytics/";


// ping api
export const postPingAPI =  async ()=>{
    try{
        const resp =  await axios.post(`${analyticsAPI}ping`);
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
    }
}



// source api
export const postSource =  async (source,post)=>{
    try{
        const resp =  await axios.post(`${analyticsAPI}source`,{source,post});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
    }
}
