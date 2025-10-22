import { get } from 'http';

const deviceUrl = process.env.PROD_URL_EC2+"api/";
const axios = require('axios');

export const getPhoneRegEx =  async (brand)=>{
    try{
        const resp =  await axios.post(`${deviceUrl}getPhonesOfBrand`,{brand});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
    }
}

export const getDevicesTable =  async ()=>{
    try{

        const resp =  await axios.post(`${deviceUrl}getDevicesTable`);
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
        return null;
    }
}


export const getUnder200Dollars =  async ()=>{
    try{

        const resp =  await axios.post(`${deviceUrl}under200Dollars`);
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
        return null;
    }
}


export const getFlagships =  async ()=>{
    try{

        const resp =  await axios.post(`${deviceUrl}flagships`);
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
        return null;
    }
}



export const getPopular =  async ()=>{
    try{

        const resp =  await axios.post(`${deviceUrl}popular`);
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top collections api call "+e);
        return null;
    }
}


// export const testAllAPI =  async ()=>{
//     try{

//     }
//     catch(e){
//         console.log("Error while testing all api "+e);
//         return null;
//     }
// }