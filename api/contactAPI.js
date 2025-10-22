const axios = require('axios');
const url = process.env.isProd?process.env.PROD_URL+'/contact':process.env.TEST_URL+'/contact';


export const addContactObj = async ({fullname,email,subject,message})=>{
    try{
        const resp = await axios.post(url+'/addContactObj',{
            fullname:fullname,
            email: email,
            subject: subject,
            message:message
        });
        console.log(resp.data);
        return resp.data.success;

    }
    catch(e){
        console.log('Error Occured ' + e);
        return false;
    }
}


