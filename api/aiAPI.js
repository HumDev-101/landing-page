
const axios = require('axios');
const aiUrl = process.env.AI_PROD_URL+"/ai";

export const getAICarousel =  async (type)=>{
    try{
        const resp =  await axios.post(`${aiUrl}/getCarouselAiData`,{type:type});
        console.log(resp.data);
        return resp.data.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
    }
}

export const askQuery = async (query, llmModel) =>{
    try{
        const resp =  await axios.post(`${process.env.AI_PROD_URL}/query`,{query:query,llmModel:llmModel});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}

export const conversationalAI = async (messagesList, llmModel) =>{
    try{
        const resp =  await axios.post(`${aiUrl}/getConversationalLLM`,{messagesList:messagesList,llmModel:llmModel});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}

export const generalCryptoAnalysis = async  (llmModel) =>{
    try{
        const resp =  await axios.post(`${aiUrl}/generalCryptoAnalysis`,{llmModel:"llama3.1"});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}

export const generalCoinCryptoAnalysis = async  (symbol,timeframe,interval,llmModel) =>{
    try{
        const resp =  await axios.post(`${aiUrl}/coinCryptoAnalysis`,{symbol:symbol+"USDT",timeframe,interval,llmModel:llmModel});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}

// generalCoinCryptoAnalysis("BTCUSDT","1d","1h","llama3.1")



export const askWeb3Agent = async (query, llmModel) =>{
    try{
        const resp =  await axios.post(`${process.env.AI_PROD_URL}/ask`,{query:query,llmModel:llmModel});
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}


export const generateResponseRAG = async (ragAgentName,query, llmModel) =>{
    try{
        const resp =  await axios.post(`${process.env.AI_PROD_URL}/rag/generateResponseFromRag`,{query:query,
            "vector_store_name":ragAgentName,
            "search_type":"similarity",
            "search_kwargs": {"k": 2},
            "llmModel":llmModel
        });
        console.log(resp.data);
        return resp.data;
    }
    catch(e){
        console.log("Error while getting top coins api call "+e);
        return e.response.data;
    }
}