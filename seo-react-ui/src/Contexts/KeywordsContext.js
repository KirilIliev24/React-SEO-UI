import {createContext, useState} from "react"
import axios from "axios";

export const KeywordsContext = createContext();





export const KeywwordsProvider = ({children}) =>{
    const [keywords, setKeywords] = useState([]);


    const getAllKeywords = async() =>{
        await axios
            .get(
                `https://localhost:44325/SearchEngine/getKeywords`,
                {
                    headers: {
                        // // 'Content-Type': 'application/json',
                        // "Access-Control-Allow-Origin": "*",
                        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                    }
                })
            .then((result) => {
                const data = result.data;
                setKeywords(data);
               
            })
            .catch((error) => console.log(error));
    }
    return(
        <KeywordsContext.Provider value = {{keywords, setKeywords, getAllKeywords}}>
            {children}
        </KeywordsContext.Provider>
    )
}