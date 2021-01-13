import {createContext, useState} from "react"
import axios from "axios";

export const KeywordsContext = createContext();





export const KeywwordsProvider = ({children}) =>{
    const [keywords, setKeywords] = useState([]);


    const getAllKeywords = async() =>{
        await axios
            .get(
                `/SearchEngine/getKeywords`,
                {headers: {}})
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