import {createContext, useState} from "react"

export const KeywordsContext = createContext();

export const KeywwordsProvider = ({children}) =>{
    const {keywords, setKeywords} = useState([]);
    return(
        <KeywordsContext.Provider value = {{keywords, setKeywords}}>
            {children}
        </KeywordsContext.Provider>
    )
}