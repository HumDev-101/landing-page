const axios = require('axios');
const url = process.env.isProd?process.env.PROD_URL_EC2:process.env.PROD_URL_EC2;

export const AnonLoginRequest = async(username,password)=>{
    try{
        const response = await axios.post(`${url}v1/api/user/anonLogin`,{username,password});
        return response.data.data;
    }
    catch(e){
        console.log("Error occured while login "+e)
        return null;
    }
}

export const socialLogin = async(username,source,name,image)=>{
    try{
        const response = await axios.post(`${url}v1/api/user/signInSocial`,{username,source,name,image});
        return response.data.data;
    }
    catch(e){
        console.log("Error occured while login "+e)
        return null;
    }
}